import mongoose, { Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface IBookModel extends mongoose.Document {
  bookTitle: string;
  pax: number;
  category: string;
}

export const bookSchema = new Schema(
  {
    bookTitle: {
      type: String,
      required: true,
    },
    pax: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.index({ createdAt: 1, updatedAt: 1 });

export const Book = mongoose.model<IBookModel>('Book', bookSchema, 'books', true);
export const BookTC = composeMongoose(Book, {
  onlyFields: ['_id', 'bookTitle', 'pax'],
});
