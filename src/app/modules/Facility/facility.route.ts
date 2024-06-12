import express from 'express';
import { facilityValidation } from './facility.validation';
import { FacilityControllers } from './facility.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(facilityValidation.createFacility),
  FacilityControllers.createFacility,
);
router.get('/', FacilityControllers.getAllFacilities);

router.put(
  '/:id',
  validateRequest(facilityValidation.updateFacility),
  FacilityControllers.updateFacility,
);

router.delete('/:id', FacilityControllers.deleteFacility);

export const FacilityRoutes = router;
