import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { facilityServices } from './facility.service';
import { Request, Response } from 'express';

const createFacility = catchAsync(async (req, res) => {
  const facility = req.body;

  const result = await facilityServices.createFacilityIntoDB(facility);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});

const getAllFacilities = catchAsync(async (req, res) => {
  const result = await facilityServices.getAllFacilitiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    data: result,
  });
});

const getSingleFacility = async (req: Request, res: Response) => {
  try {
    const { facilityId } = req.params;
    const result = await facilityServices.getSingleFacilityFromDB(facilityId);
    res.status(200).json({
      success: true,
      message: 'Facility fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

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

const deleteFacility = catchAsync(async (req, res) => {
  console.log('works deleteFacility');
  const { id } = req.params;
  const result = await facilityServices.deleteFacilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility deleteded successfully',
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacility,
  getAllFacilities,
  getSingleFacility,
  deleteFacility,
};
