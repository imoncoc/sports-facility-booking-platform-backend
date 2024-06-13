import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { FacilityRoutes } from '../modules/Facility/facility.route';
import { AuthRoutes } from '../modules/Auth/auth.router';
import { BookingRoutes } from '../modules/Booking/booking.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
