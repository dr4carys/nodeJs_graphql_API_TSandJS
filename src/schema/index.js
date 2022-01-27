import { SchemaComposer } from 'graphql-compose';

// import db from '../utils/db'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();
// import { schemaComposer } from 'graphql-compose';
import {
  userFindById,
  userCreateOne,
  userUpdateById,
  userConnection,
} from './user';

import { categoryCreateOne, categoryFindById } from './category';
import {
  bookCreateOne,
  bookFindById,
  bookUpdateById,
  bookFindMany,
} from './book';
import {
  rentBook,
  returnBook,
  borrowBookConnection,
  borrowBookFindById,
} from './borrowBook';

schemaComposer.Query.addFields({
  userFindById,
  userConnection,
  bookFindById,
  bookFindMany,
  categoryFindById,
  borrowBookConnection,
  borrowBookFindById,
});

schemaComposer.Mutation.addFields({
  rentBook,
  returnBook,
  userCreateOne,
  userUpdateById,
  bookCreateOne,
  bookUpdateById,
  categoryCreateOne,
});

export default schemaComposer.buildSchema();
