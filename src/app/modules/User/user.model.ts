import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import validator from 'validator';

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email type',
    },
  },
  password: {
    type: String,
    required: true,
  },
  phone: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
  },
  address: { type: String, required: true },
});

export const UserModel = model<TUser>('User', userSchema);
