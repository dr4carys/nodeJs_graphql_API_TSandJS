import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeMongoose } from 'graphql-compose-mongoose';

export const carSchema = new Schema(
    {
        carTitle: {
            type: String,
        },
        color: {
            type: String,
        },
    },
    {
        collection: 'car',
    }
);

bookSchema.plugin(timestamps);

bookSchema.index({ createdAt: 1, updatedAt: 1 });

export const Book = mongoose.model('Car', carSchema);
export const BookTC = composeMongoose(Book);
