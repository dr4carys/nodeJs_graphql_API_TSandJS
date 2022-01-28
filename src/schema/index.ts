import { schemaComposer } from 'graphql-compose';
import { userFindById, userCreateOne, userUpdateById, userConnection } from './user';
import { categoryCreateOne, categoryFindById } from './category';
import { bookCreateOne, bookFindById, bookUpdateById, bookFindMany } from './book';
import { rentBook, returnBook, borrowBookConnection, borrowBookFindById } from './borrowBook';
import { authorCreateOne, authorFindById, authorConnection, authorCreateMany } from './author';
schemaComposer.Query.addFields({
  userFindById,
  userConnection,
  bookFindById,
  bookFindMany,
  categoryFindById,
  borrowBookConnection,
  borrowBookFindById,
  authorFindById,
  authorConnection,
});

schemaComposer.Mutation.addFields({
  rentBook,
  returnBook,
  userCreateOne,
  userUpdateById,
  bookCreateOne,
  bookUpdateById,
  categoryCreateOne,
  authorCreateOne,
  authorCreateMany,
});

export const graphqlSchema = schemaComposer.buildSchema();
