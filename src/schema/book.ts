import { Book, BookTC, IBookModel } from '../models/book';
import { CategoryTC } from '../models/category';
import { ResolverResolveParams } from 'graphql-compose/lib/Resolver';

BookTC.addRelation('categoryDetail', {
  resolver: () => CategoryTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source: IBookModel) => source.category,
  },
  projection: { category: 1 },
});

export const bookCreateOne = BookTC.mongooseResolvers.createOne();

export const bookFindById = BookTC.mongooseResolvers.findById({ lean: true });

export const bookUpdateById = BookTC.mongooseResolvers
  .updateById()
  .wrapResolve((next) => async (rp: ResolverResolveParams<any, any>) => {
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
    query: (query, value: string) => {
      query.bookTitle = new RegExp(`^${value}`, 'i');
    },
  })
  .removeArg(['sort', 'skip', 'limit']);
