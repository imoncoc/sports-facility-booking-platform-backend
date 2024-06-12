import mongoose from 'mongoose';
import { TFacility } from './facility.interface';
import { Facility } from './facility.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createFacilityIntoDB = async (facility: TFacility) => {
  const result = await Facility.create(facility);
  return result;
};

const updateFacilityInDB = async (
  id: string,
  updateData: Partial<TFacility>,
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid facility ID');
  }

  const objectId = new mongoose.Types.ObjectId(id);

  // Check if the document exists before updating
  const existingFacility = await Facility.findById(objectId);
  if (!existingFacility) {
    return null;
  }

  const updatedProduct = await Facility.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    { $set: updateData },
    { new: true, runValidators: true },
  );
  return updatedProduct;
};

export const facilityServices = {
  createFacilityIntoDB,
  updateFacilityInDB,
};
