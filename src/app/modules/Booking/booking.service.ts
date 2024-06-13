import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (booking: TBooking) => {
  const result = await Booking.create(booking);
  return result;
};

const getAllBookingFromDB = async () => {
  const result = await Booking.find();
  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
};
