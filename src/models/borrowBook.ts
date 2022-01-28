import mongoose, { Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface IBorrowBookModel extends mongoose.Document {
  idUser: string;
  idBook: string;
  startPinjam: Date;
  endPinjam: Date;
  status: boolean;
  pax: number;
}

export const borrowBookSchema = new Schema(
  {
    idUser: {
      type: String,
      ref: 'User',
      required: true,
    },
    idBook: {
      type: String,
      ref: 'Book',
      required: true,
    },
    startPinjam: {
      type: Date,
      required: true,
    },
    endPinjam: {
      type: Date,
      requited: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    pax: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


borrowBookSchema.index({ createdAt: 1, updatedAt: 1 });

export const borrowBook = mongoose.model<IBorrowBookModel>('borrowBook', borrowBookSchema, 'borrowBook', true);
export const borrowBookTC = composeMongoose(borrowBook, {
  onlyFields: ['_id', 'idUser', 'idBook', 'status', 'createdAt', 'updatedAt', 'startPinjam', 'endPinjam', 'pax'],
});
