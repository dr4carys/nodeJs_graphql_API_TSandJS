import { schemaComposer } from 'graphql-compose';
import { userFindById, userCreateOne, userUpdateById, userConnection } from './user';
import { categoryCreateOne, categoryFindById } from './category';
import { bookCreateOne, bookFindById, bookUpdateById, bookFindMany } from './book';
import { rentBook, returnBook, borrowBookConnection, borrowBookFindById } from './borrowBook';
import { authorCreateOne, authorFindById, authorConnection, authorCreateMany } from './author';
import { allNilai, isiNilai } from './nilai';
import { buatPembimbing } from './pembimbing';

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
  allNilai,
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
  buatPembimbing,
  isiNilai,
});

export const graphqlSchema = schemaComposer.buildSchema();
