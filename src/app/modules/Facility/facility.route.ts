import express from 'express';
import { facilityValidation } from './facility.validation';
import { FacilityControllers } from './facility.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(facilityValidation.createFacility),
  FacilityControllers.createFacility,
);
router.get('/', FacilityControllers.getAllFacilities);
router.get('/:facilityId', FacilityControllers.getSingleFacility);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(facilityValidation.updateFacility),
  FacilityControllers.updateFacility,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  FacilityControllers.deleteFacility,
);

export const FacilityRoutes = router;
