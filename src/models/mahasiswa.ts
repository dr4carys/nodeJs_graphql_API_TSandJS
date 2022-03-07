import mongoose, { Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface IMahasiswaModel extends mongoose.Document {
  name: string;
  NIM: string;
}

export const mahasiswaSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
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

mahasiswaSchema.index({ createdAt: 1, updatedAt: 1 });

export const Mahasiswa = mongoose.model<IMahasiswaModel>('Mahasiswa', mahasiswaSchema, 'mahasiswa', true);
export const MahasiswaTC = composeMongoose(Mahasiswa, {
  onlyFields: ['name', '_id'],
});
