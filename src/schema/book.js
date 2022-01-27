import { ApolloError } from 'apollo-server-express';
import { Book, BookTC } from '../models/book';
import { CategoryTC } from '../models/category';

BookTC.addRelation('categoryDetail', {
  resolver: () => CategoryTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.category,
  },
  projection: { category: 1 },
});

export const bookCreateOne = BookTC.mongooseResolvers.createOne({ lean: true });

export const bookFindById = BookTC.mongooseResolvers.findById({ lean: true });

export const bookUpdateById = BookTC.mongooseResolvers
  .updateById()
  .wrapResolve((next) => async (rp) => {
    const {
      _id,
      record: { pax },
    } = rp.args;
    const data = await Book.findOne({ _id }, { pax: 1 });
    data.pax = data.pax + pax;
    if (pax) {
      if (data.pax < 1) data.pax = 0;
      rp.args.record = {
        pax: data.pax,
      };
    }
    return next(rp);
  });

export const bookFindMany = BookTC.mongooseResolvers
  .findMany({
    lean: true,
    filter: { removeFields: ['category', 'pax', 'bookTitle'] },
  })
  .addFilterArg({
    name: 'text',
    type: 'String!',
    description: 'search by text',
    filterTypeNameFallback: 'FilterTextInput',
    query: (query, value) => {
      query.bookTitle = new RegExp(`^${value}`, 'i');
    },
  })
  .removeArg(['sort', 'skip', 'limit']);
