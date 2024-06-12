import { Router } from 'express';
import { FacilityRoutes } from '../modules/Facility/facility.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/facility',
    route: FacilityRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
