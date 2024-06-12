import express from 'express';
import { facilityValidation } from './facility.validation';
import { FacilityControllers } from './facility.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/facility',
  validateRequest(facilityValidation.createFacility),
  FacilityControllers.createFacility,
);

router.put(
  '/facility/:id',
  validateRequest(facilityValidation.updateFacility),
  FacilityControllers.updateFacility,
);

export const FacilityRoutes = router;
