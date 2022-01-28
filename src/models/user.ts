import mongoose, { Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface IUserModel extends mongoose.Document {
  name: string;
  email: string;
  no_hp: string;
  alamat: string;
}
export const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
    },
    no_hp: {
      type: String,
    },
    alamat: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const User = mongoose.model<IUserModel>('User', UserSchema, 'users', true);
export const UserTC = composeMongoose(User, {
  onlyFields: ['name', 'email', 'no_hp', 'alamat'],
});
