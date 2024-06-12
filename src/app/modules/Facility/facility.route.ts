import express from 'express';
import { facilityValidation } from './facility.validation';
import { FacilityControllers } from './facility.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  validateRequest(facilityValidation.createFacility),
  FacilityControllers.createFacility,
);
router.get('/', auth('user'), FacilityControllers.getAllFacilities);

router.put(
  '/:id',
  validateRequest(facilityValidation.updateFacility),
  FacilityControllers.updateFacility,
);

router.delete('/:id', FacilityControllers.deleteFacility);

export const FacilityRoutes = router;
