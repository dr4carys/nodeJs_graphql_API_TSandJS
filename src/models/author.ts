import mongoose, { Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface IAuthorModel extends mongoose.Document {
  name: string;
  description: string;
  books: string[];
}
export const authorSchema = new Schema(
  {
    name: {
      type: 'String',
      required: true,
    },
    description: {
      type: 'String',
    },
    books: [
      {
        type: String,
        ref: 'books',
      },
    ],
  },
  {
    timestamps: true,
  }
);

authorSchema.index({ createdAt: 1, updatedAt: 1 });

export const Author = mongoose.model<IAuthorModel>('Author', authorSchema, 'Author', true);
export const AuthorTC = composeMongoose(Author, { onlyFields: ['name', 'description', 'books'] });
