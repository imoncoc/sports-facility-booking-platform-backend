import mongoose, { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new mongoose.Schema<TBooking>({
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
  },
  endTime: {
    type: String,
    required: [true, 'Start time is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  facility: {
    type: Schema.Types.ObjectId,
    required: [true, 'facility id is required'],
    ref: 'Facility',
  },
  payableAmount: {
    type: Number,
    required: [true, 'PayableAmount is required'],
    default: false,
  },
  isBooked: {
    type: String,
    enum: ['confirmed', 'unconfirmed', 'canceled'],
    default: 'confirmed',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  transactionId: {
    type: String,
    required: [true, 'Transaction Id is required'],
  },
});

export const Booking = model<TBooking>('Booking', bookingSchema);
