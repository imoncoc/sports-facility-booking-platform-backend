import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Facility } from '../Facility/facility.model';
import { TBooking, TSchedule } from './booking.interface';
import { Booking } from './booking.model';
import { formatDate, timeConflict, validateDateFormat } from './booking.utils';
import { User } from '../User/user.model';
import { JwtPayload } from 'jsonwebtoken';
import { initialPayment } from '../payment/payment.utils';

const createBookingIntoDB = async (
  userEmail: string,
  payload: Partial<TBooking>,
) => {
  const { facility, startTime, endTime, date } = payload;
  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);

  const isFacilityExist = await Facility.findById(facility);
  if (!isFacilityExist || isFacilityExist.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
  }

  const durationHours =
    (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);

  const payableAmount = durationHours * isFacilityExist.pricePerHour;
  if (payableAmount <= 0) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'End Time must be greater then Start time.',
    );
  }

  const assignSchedules = await Booking.find({
    facility,
    date: { $in: date },
  }).select('date startTime endTime');

  const newSchedule = {
    date,
    startTime,
    endTime,
  };

  if (timeConflict(assignSchedules, newSchedule as TSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This facility is not available at that time! choose other time or date`,
    );
  }

  const user = await User.isUsersExistsByCustomId(userEmail);
  const userId = user?._id;

  const transactionId = `TXN-${Date.now()}`;

  const result = await Booking.create({
    date,
    endTime,
    facility,
    isBooked: 'confirmed',
    payableAmount,
    startTime,
    user: userId,
    paymentStatus: 'pending',
    transactionId,
  });

  await result.save();

  // Added Payment

  const paymentData = {
    transactionId,
    amount: payableAmount,
    customerName: user.name,
    customerEmail: user.email,
    customerPhone: user.phone,
    customerAddress: user.address,
  };
  const paymentSession = await initialPayment(paymentData);

  return paymentSession;
};

const getAllBookingFromDB = async () => {
  const result = await Booking.find().populate('facility');
  return result;
};

const getAllBookingByUserFromDB = async (user: JwtPayload) => {
  const users = await User.isUsersExistsByCustomId(user?.userEmail);
  const userId = users._id;

  const result = await Booking.find({ user: userId }).populate('facility');

  return result;
};

const deleteBookingByUserFromDB = async (id: string, user: JwtPayload) => {
  const { userEmail } = user;
  const userData = await User.isUsersExistsByCustomId(userEmail);
  const isBookingExists = await Booking.findById(id).populate('facility');
  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, `This Booking is not found`);
  }
  if (isBookingExists.isBooked === 'canceled') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This booking is already canceled',
    );
  }

  if (
    userData._id &&
    userData._id.toString() !== isBookingExists.user.toString()
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You have no access this route to cancel this booking',
    );
  }

  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    { isBooked: 'canceled' },
    { new: true, select: '-user' },
  ).populate('facility');

  if (!updatedBooking) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update the booking',
    );
  }

  return updatedBooking;
};

const checkAvailabilityByDateAndFacilityIntoDB = async (
  dateData: string,
  facilityId: string,
) => {
  const currentDate = new Date();
  const updateDate = formatDate(currentDate);
  const queryDate = dateData ? dateData : updateDate;

  // Validate date format
  if (!validateDateFormat(queryDate)) {
    throw new Error('Invalid date format. Date must be in YYYY-MM-dd format.');
  }

  // Validate facilityId
  if (!facilityId) {
    throw new Error('Facility ID is required.');
  }

  // Find bookings by date and facilityId
  const availableSlotsDate = await Booking.find({
    date: queryDate,
    facility: facilityId,
  });

  const bookedTimeSlots = availableSlotsDate.map((data) => ({
    startTime: data.startTime,
    endTime: data.endTime,
  }));

  // Initial time range for available slots
  let availableStartTime = '00:00';
  let availableEndTime = '23:59';

  if (bookedTimeSlots.length === 0) {
    availableStartTime = '00:00';
    availableEndTime = '23:59';
  }

  // Initialize available time slots
  let availableSlots: { startTime: string; endTime: string }[] = [
    { startTime: availableStartTime, endTime: availableEndTime },
  ];

  // Function to convert time string to minutes
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Filter out booked time slots from available time slots
  for (const booking of bookedTimeSlots) {
    availableSlots = availableSlots.reduce(
      (result, slot) => {
        const slotStartMinutes = timeToMinutes(slot.startTime);
        const slotEndMinutes = timeToMinutes(slot.endTime);
        const bookingStartMinutes = timeToMinutes(booking.startTime);
        const bookingEndMinutes = timeToMinutes(booking.endTime);

        // Check if booking overlaps with slot
        if (
          bookingStartMinutes < slotEndMinutes &&
          bookingEndMinutes > slotStartMinutes
        ) {
          if (slotStartMinutes < bookingStartMinutes) {
            result.push({
              startTime: slot.startTime,
              endTime: booking.startTime,
            });
          }
          if (slotEndMinutes > bookingEndMinutes) {
            result.push({ startTime: booking.endTime, endTime: slot.endTime });
          }
        } else {
          result.push(slot);
        }
        return result;
      },
      [] as { startTime: string; endTime: string }[],
    );
  }

  return availableSlots;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  checkAvailabilityByDateAndFacilityIntoDB,
  getAllBookingByUserFromDB,
  deleteBookingByUserFromDB,
};
