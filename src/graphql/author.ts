import { AuthorTC, IAuthorModel } from '../models/author';
import { BookTC } from '../models/book';
// import { ResolverResolveParams } from 'graphql-compose/lib/Resolver';

AuthorTC.addRelation('detailBook', {
  resolver: () => BookTC.mongooseResolvers.dataLoaderMany({ lean: true }),
  prepareArgs: {
    _ids: (source: IAuthorModel) => source.books,
  },
  projection: { books: 1 },
});
export const authorCreateOne = AuthorTC.mongooseResolvers.createOne();

export const authorFindById = AuthorTC.mongooseResolvers.findById();

export const authorConnection = AuthorTC.mongooseResolvers.connection({
  defaultLimit: 10,
  findManyOpts: { filter: { removeFields: ['description', 'books'] } },
});

export const authorCreateMany = AuthorTC.mongooseResolvers.createMany();

export const authorUpdateById = AuthorTC.mongooseResolvers.updateById();
