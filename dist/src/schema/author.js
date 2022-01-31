"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorUpdateById = exports.authorCreateMany = exports.authorConnection = exports.authorFindById = exports.authorCreateOne = void 0;
const author_1 = require("../models/author");
const book_1 = require("../models/book");
// import { ResolverResolveParams } from 'graphql-compose/lib/Resolver';
author_1.AuthorTC.addRelation('detailBook', {
    resolver: () => book_1.BookTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    prepareArgs: {
        _ids: (source) => source.books,
    },
    projection: { books: 1 },
});
exports.authorCreateOne = author_1.AuthorTC.mongooseResolvers.createOne();
exports.authorFindById = author_1.AuthorTC.mongooseResolvers.findById();
exports.authorConnection = author_1.AuthorTC.mongooseResolvers.connection({
    defaultLimit: 10,
    findManyOpts: { filter: { removeFields: ['description', 'books'] } },
});
exports.authorCreateMany = author_1.AuthorTC.mongooseResolvers.createMany();
exports.authorUpdateById = author_1.AuthorTC.mongooseResolvers.updateById();
//# sourceMappingURL=author.js.map