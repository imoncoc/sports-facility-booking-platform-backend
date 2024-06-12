import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { FacilityRoutes } from '../modules/Facility/facility.route';
import { AuthRoutes } from '../modules/Auth/auth.router';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
