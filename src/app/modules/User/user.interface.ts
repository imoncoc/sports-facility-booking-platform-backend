/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
}

export interface UserModel extends Model<TUser> {
  // instance methods checking if the user exists
  isUsersExistsByCustomId(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  // isJwtIssuedBeforePasswordChanged(
  //   passwordChangedTimestamp: Date,
  //   jwtIssuedTimestamp: number,
  // ): boolean;
}
