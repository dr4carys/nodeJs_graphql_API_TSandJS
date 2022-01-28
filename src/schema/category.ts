import { CategoryTC } from '../models/category';

export const categoryCreateOne = CategoryTC.mongooseResolvers.createOne();

export const categoryFindById = CategoryTC.mongooseResolvers.findById();
