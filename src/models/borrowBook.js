import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeMongoose } from 'graphql-compose-mongoose';

export const borrowBookSchema = new Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    idBook: {
      type: Schema.Types.ObjectId,
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
    collection: 'borrowBooks',
  }
);

borrowBookSchema.plugin(timestamps);

borrowBookSchema.index({ createdAt: 1, updatedAt: 1 });

export const borrowBook = mongoose.model('borrowBook', borrowBookSchema);
export const borrowBookTC = composeMongoose(borrowBook, {
  onlyFields: [
    '_id',
    'idUser',
    'idBook',
    'status',
    'createdAt',
    'updatedAt',
    'startPinjam',
    'endPinjam',
    'pax',
  ],
});
