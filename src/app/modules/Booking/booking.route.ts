import express from 'express';
import { BookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '',
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.createBooking),
  BookingControllers.createBooking,
);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBooking);

export const BookingRoutes = router;
