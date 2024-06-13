import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (payload: TBooking) => {
  console.log('service payload: ', payload);
  const result = await Booking.create(payload);
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
