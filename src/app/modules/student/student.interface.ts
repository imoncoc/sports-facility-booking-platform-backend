import { Schema, model, connect } from 'mongoose';

export type Guardian = {
  father: string;
  fatherOccupation: string;
  fatherContactNo: string;
  mother: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type Student = {
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  email: string;
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: 'A' | 'A+' | 'B+' | 'B-' | 'O-' | 'O+' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
};
