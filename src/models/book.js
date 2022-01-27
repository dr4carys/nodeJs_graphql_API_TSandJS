import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeMongoose } from 'graphql-compose-mongoose';

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
    collection: 'books',
  }
);

bookSchema.plugin(timestamps);

bookSchema.index({ createdAt: 1, updatedAt: 1 });

export const Book = mongoose.model('Book', bookSchema);
export const BookTC = composeMongoose(Book, {
  onlyFields: ['_id', 'bookTitle', 'pax','category'],
});
