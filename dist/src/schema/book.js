"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookFindMany = exports.bookUpdateById = exports.bookFindById = exports.bookCreateOne = void 0;
const book_1 = require("../models/book");
const category_1 = require("../models/category");
book_1.BookTC.addRelation('categoryDetail', {
    resolver: () => category_1.CategoryTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.category,
    },
    projection: { category: 1 },
});
exports.bookCreateOne = book_1.BookTC.mongooseResolvers.createOne();
exports.bookFindById = book_1.BookTC.mongooseResolvers.findById({ lean: true });
exports.bookUpdateById = book_1.BookTC.mongooseResolvers
    .updateById()
    .wrapResolve((next) => async (rp) => {
    const { _id, record: { pax }, } = rp.args;
    const data = await book_1.Book.findOne({ _id }, { pax: 1 });
    data.pax = data.pax + pax;
    if (pax) {
        if (data.pax < 1)
            data.pax = 0;
        rp.args.record = {
            pax: data.pax,
        };
    }
    return next(rp);
});
exports.bookFindMany = book_1.BookTC.mongooseResolvers
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
//# sourceMappingURL=book.js.map