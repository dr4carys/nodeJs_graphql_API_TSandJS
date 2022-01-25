import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeMongoose } from 'graphql-compose-mongoose';

export const borrowBookSchema = new Schema(
    {
        idUser: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        idBook: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
        },
        startPinjam: {
            type: Date,
        },
        endPinjam: {
            type: Date,
        },
        status: {
            type: Boolean,
        },
        Pax: {
            type: String,
        },
    },
    {
        collection: 'borrowBooks',
    }
);

borrowBookSchema.plugin(timestamps);

borrowBookSchema.index({ createdAt: 1, updatedAt: 1 });

export const borrowBook = mongoose.model('borrowBook', borrowBookSchema);
export const borrowBookTC = composeMongoose(borrowBook);
