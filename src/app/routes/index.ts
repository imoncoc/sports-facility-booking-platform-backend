import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { FacilityRoutes } from '../modules/Facility/facility.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '',
    route: FacilityRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
