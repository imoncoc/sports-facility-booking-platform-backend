import { z } from 'zod';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

// Date format validation (YYYY-MM-DD)
const dateStringSchema = z.string().refine(
  (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  },
  {
    message: 'Invalid date format, expected "YYYY-MM-DD"',
  },
);

const createBooking = z.object({
  body: z.object({
    date: dateStringSchema,
    startTime: timeStringSchema, // Add specific time format validation if needed
    endTime: timeStringSchema, // Add specific time format validation if needed
    user: z.string({ required_error: 'user is required' }).optional(),
    facility: z.string({ required_error: 'Facility is required' }),
    payableAmount: z
      .number()
      .optional()
      .refine((val) => val === undefined || val >= 0, {
        message: 'Payable amount must be a positive number.',
      }),
    isBooked: z
      .enum(['confirmed', 'unconfirmed', 'canceled'], {
        required_error: 'Booking status is required.',
      })
      .optional(),
  }),
});

export const BookingValidation = {
  createBooking,
};
