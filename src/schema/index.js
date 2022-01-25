import { SchemaComposer } from 'graphql-compose';

// import db from '../utils/db'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();
// import { schemaComposer } from 'graphql-compose';
import {
  userCreateOne,
  findManyUser,
  findUser,
  UpdateUser,
  createWeb,
  ambilDataWeb,
  signup,
  logIn,
  findManyUserCustom,
} from './user';
import { buat_web } from './web';
import {
  CreateTaskData,
  ambilData,
  createTask,
  findTaskByUser,
  detailTask,
  editTaskByUser,
} from './task';

import { buatBuku } from './book';
import { pinjamBook, returnBook } from './borrowBook';

schemaComposer.Query.addFields({
  findManyUserCustom,
  ambilDataWeb,
  ambilData,
  findUser,
  findManyUser,
  findTaskByUser,
  detailTask,
});

schemaComposer.Mutation.addFields({
  createTask,
  logIn,
  signup,
  buat_web,
  CreateTaskData,
  userCreateOne,
  UpdateUser,
  createWeb,
  editTaskByUser,
  buatBuku,
  pinjamBook,
  returnBook,
});

export default schemaComposer.buildSchema();
