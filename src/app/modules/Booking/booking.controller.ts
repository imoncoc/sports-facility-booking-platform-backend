import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.service';
import { User } from '../User/user.model';
import { Facility } from '../Facility/facility.model';
import AppError from '../../errors/AppError';

const createBooking = catchAsync(async (req, res) => {
  const booking = req.body;
  const facilityID = booking?.facility;
  const isFacilityExists = await Facility.findById(facilityID);
  if (!isFacilityExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid facility id!');
  }

  const user = await User.isUsersExistsByCustomId(req?.user?.userEmail);
  const userId = user?._id;

  const bookingBody = { user: userId, ...booking };

  const result = await bookingServices.createBookingIntoDB(bookingBody);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookingFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
};
