"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBookFindById = exports.borrowBookConnection = exports.returnBook = exports.rentBook = void 0;
// import { query } from 'express';
const book_1 = require("../models/book");
const borrowBook_1 = require("../models/borrowBook");
const user_1 = require("../models/user");
borrowBook_1.borrowBookTC.addRelation('detailUser', {
    resolver: () => user_1.UserTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.idUser,
    },
    projection: { idUser: 1 },
});
borrowBook_1.borrowBookTC.addRelation('detailBook', {
    resolver: () => book_1.BookTC.mongooseResolvers.dataLoader({ lean: true }),
    prepareArgs: {
        _id: (source) => source.idBook,
    },
    projection: { idBook: 1 },
});
exports.rentBook = borrowBook_1.borrowBookTC.mongooseResolvers
    .createOne({
    record: { removeFields: ['_id', 'startPinjam', 'createdAt', 'updatedAt'] },
})
    .wrapResolve((next) => async (rp) => {
    const { record: { idBook, pax: Pax, endPinjam }, } = rp.args;
    const data = await book_1.Book.findById(idBook);
    if (data.pax < 1 || new Date(endPinjam).getTime() < new Date().getTime()) {
        throw new Error('error wether book in unvailable or wrong input date');
    }
    else {
        data.pax = data.pax - Pax;
    }
    rp.beforeRecordMutate = (record) => {
        record.startPinjam = new Date();
        record.status = true;
        return record;
    };
    const [dataBook] = await Promise.all([
        next(rp),
        book_1.Book.findByIdAndUpdate({ _id: idBook }, { $set: { pax: data.pax } }),
    ]);
    return dataBook;
});
exports.returnBook = borrowBook_1.borrowBookTC.mongooseResolvers
    .updateById()
    .wrapResolve((next) => async (rp) => {
    const { _id: userRef } = rp.args;
    const data = await borrowBook_1.borrowBook.findById(userRef);
    if (new Date().getTime() > data.endPinjam.getTime())
        throw new Error('late to return the book');
    if (!data.status)
        throw new Error('book has been return');
    rp.args.record = {
        status: false,
    };
    return next(rp);
})
    .removeArg(['record']);
exports.borrowBookConnection = borrowBook_1.borrowBookTC.mongooseResolvers
    .connection({
    defaultLimit: 10,
    findManyOpts: {
        filter: {
            removeFields: ['_id', 'idBook', 'createdAt', 'updatedAt', 'startPinjam', 'endPinjam', 'pax'],
        },
    },
})
    .addSortArg({
    name: '_DATE_ASC',
    value: {
        createdAt: 1,
    },
});
exports.borrowBookFindById = borrowBook_1.borrowBookTC.mongooseResolvers.findById();
//# sourceMappingURL=borrowBook.js.map