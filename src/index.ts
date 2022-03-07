import router from './router';
import express from 'express';
import mongoose from 'mongoose';

import { MONGO_DEBUG, MONGODB_URL } from './config';
import { Mongoose } from 'mongoose';

const app = express();
let conn: Mongoose;

app.use(async (req, res, next) => {
  if (conn === undefined) conn = await mongoose.connect(MONGODB_URL);
  mongoose.set('debug', MONGO_DEBUG);
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
export const App = app;
