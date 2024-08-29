import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { FacilityRoutes } from '../modules/Facility/facility.route';
import { AuthRoutes } from '../modules/Auth/auth.router';
import { BookingRoutes } from '../modules/Booking/booking.route';
import { paymentRoutes } from '../modules/payment/payment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/facility',
    route: FacilityRoutes,
  },
  {
    path: '',
    route: BookingRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
