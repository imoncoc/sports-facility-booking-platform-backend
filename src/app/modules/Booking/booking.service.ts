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

const checkAvailabilityByDateIntoDB = async (term: string) => {
  console.log('checkAvailabilityByDateIntoDB: ', term);
  // const result = await Booking.find({
  //   $or: [{ search: { $regex: term, $options: 'i' } }],
  // });

  return null;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  checkAvailabilityByDateIntoDB,
};
