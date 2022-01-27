import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeMongoose } from 'graphql-compose-mongoose';

export const categorySchema = new Schema({
  nameCategory: {
    type: String,
    required: true,
  },
});

categorySchema.plugin(timestamps);

categorySchema.index({ _id: 1 });

export const Category = mongoose.model('Category', categorySchema);
export const CategoryTC = composeMongoose(Category, {
  onlyFields: ['_id', 'nameCategory'],
});
