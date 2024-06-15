import mongoose from 'mongoose';
import { TFacility } from './facility.interface';
import { Facility } from './facility.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createFacilityIntoDB = async (facility: TFacility) => {
  const result = await Facility.create(facility);
  return result;
};

const getAllFacilitiesFromDB = async () => {
  const result = await Facility.find();
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
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid facility ID');
  }

  const updatedProduct = await Facility.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    { $set: updateData },
    { new: true, runValidators: true },
  );
  console.log('updatedProduct: ', updatedProduct);
  return updatedProduct;
};

const deleteFacilityFromDB = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);
  const deletedFaculty = await Facility.findOneAndUpdate(
    { _id: objectId },
    { isDeleted: true },
    { new: true },
  );
  return deletedFaculty;
};

export const facilityServices = {
  createFacilityIntoDB,
  updateFacilityInDB,
  getAllFacilitiesFromDB,
  deleteFacilityFromDB,
};
