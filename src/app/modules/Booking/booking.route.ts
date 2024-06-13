import express from 'express';
import { BookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookingValidation.createBooking),
  BookingControllers.createBooking,
);
