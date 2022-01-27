import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeMongoose } from 'graphql-compose-mongoose';

export const authorSchema = new Schema(
  {
    name: {
      type: 'String',
      required: true,
    },
    description: {
      type: 'String',
    },
    books: {
      type: String,
      ref: 'books',
    },
  },
  {
    collection: 'author',
  }
);

authorSchema.plugin(timestamps);
authorSchema.index({ createdAt: 1, updatedAt: 1 });

export const Author = mongoose.model('Author', authorSchema);
export const AuthorTC = composeMongoose(Author)