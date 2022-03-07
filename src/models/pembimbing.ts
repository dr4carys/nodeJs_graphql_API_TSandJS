import mongoose, { Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface IPembimbingModel extends mongoose.Document {
  name: string;
  NIK: string;
}

export const pembimbingSchema = new Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

pembimbingSchema.index({ createdAt: 1, updatedAt: 1 });

export const Pembimbing = mongoose.model<IPembimbingModel>('Pembimbing', pembimbingSchema, 'pembimbing', true);
export const PembimbingTC = composeMongoose(Pembimbing, {
  onlyFields: ['name', '_id'],
});
