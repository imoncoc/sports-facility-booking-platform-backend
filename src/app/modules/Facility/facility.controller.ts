import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { facilityServices } from './facility.service';

const createFacility = catchAsync(async (req, res) => {
  const facility = req.body;
  //   console.log({ user });

  const result = await facilityServices.createFacilityIntoDB(facility);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const faculty = req.body;
  const result = await facilityServices.updateFacilityInDB(id, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility updated successfully',
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacility,
};
