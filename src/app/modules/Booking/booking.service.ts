import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (booking: TBooking) => {
  const result = await Booking.create(booking);
  return result;
};

export const bookingServices = {
  createBookingIntoDB,
};
