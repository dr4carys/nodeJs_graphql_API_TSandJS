import mongoose, { Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface INilaiModel extends mongoose.Document {
  idMahasiswa: string;
  idP1: string;
  idP2: string;
  idP3: string;
  nilaiP1: number;
  nilaiP2: number;
  nilaiP3: number;
}

export const nilaiSchema = new Schema(
  {
    idMahasiswa: {
      type: String,
      ref: 'Mahasiswa',
      required: true,
    },
    idPembimbing: {
      type: String,
      ref: 'Pembimbing',
      required: true,
    },
    nilai: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

nilaiSchema.index({ createdAt: 1, updatedAt: 1 });

export const Nilai = mongoose.model<INilaiModel>('Nilai', nilaiSchema, 'nilai', true);
export const NilaiTC = composeMongoose(Nilai, {
  onlyFields: ['idMahasiswa', 'idPembimbing','nilai'],
});
