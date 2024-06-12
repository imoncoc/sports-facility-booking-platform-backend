import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

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
    select: false,
  },
  phone: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
  },
  address: { type: String, required: true },
});

// pre save middleware / hook
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: save data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // current document
  // hashing password and save into DB
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

// set empty "" after saving password
userSchema.post('save', function (doc, next) {
  // console.log(this, 'post hook: after saved data');
  doc.password = '';
  next();
});

export const UserModel = model<TUser>('User', userSchema);
