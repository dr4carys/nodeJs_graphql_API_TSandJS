import mongoose, { Schema } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';

export interface ICategoryModel extends mongoose.Document {
  nameCategory: string;
}
export const categorySchema = new Schema(
  {
    nameCategory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ _id: 1 });

export const Category = mongoose.model<ICategoryModel>('Category', categorySchema, 'categories', true);
export const CategoryTC = composeMongoose(Category, {
  onlyFields: ['_id', 'nameCategory'],
});
