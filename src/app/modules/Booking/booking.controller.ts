import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.service';
import { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

const createBooking = catchAsync(async (req, res) => {
  const { userEmail } = req.user;

  const result = await bookingServices.createBookingIntoDB(userEmail, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookingFromDB();

  if (result && result?.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

const getAllBookingByUser = catchAsync(async (req, res) => {
  const user: JwtPayload = req.user;
  const result = await bookingServices.getAllBookingByUserFromDB(user);

  if (result && result?.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

const deleteBookingByUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user: JwtPayload = req.user;
  const result = await bookingServices.deleteBookingByUserFromDB(id, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
});

const checkAvailability = catchAsync(async (req, res) => {
  const { date } = req.query;

  const result = await bookingServices.checkAvailabilityByDateIntoDB(
    date as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  checkAvailability,
  getAllBookingByUser,
  deleteBookingByUser,
};
