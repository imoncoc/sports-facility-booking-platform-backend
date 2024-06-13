import { z } from 'zod';

const createBooking = z.object({
  body: z.object({
    date: z.date({
      required_error: 'Date is required.',
      invalid_type_error: 'Date must be a valid date.',
    }),
    startTime: z.string({
      required_error: 'Start time is required.',
      invalid_type_error: 'Start time must be a string.',
    }), // Add specific time format validation if needed
    endTime: z.string({
      required_error: 'End time is required.',
      invalid_type_error: 'End time must be a string.',
    }), // Add specific time format validation if needed
    user: z.string({ required_error: 'user is required' }),
    facility: z.string({ required_error: 'Facility is required' }),
    payableAmount: z
      .number()
      .optional()
      .refine((val) => val === undefined || val >= 0, {
        message: 'Payable amount must be a positive number.',
      }),
    isBooked: z.enum(['confirmed', 'unconfirmed', 'canceled'], {
      required_error: 'Booking status is required.',
    }),
  }),
});

export const BookingValidation = {
  createBooking,
};
