import { query } from 'express';
import { Book, BookTC } from '../models/book';
import { borrowBook, borrowBookTC } from '../models/borrowBook';
import { User, UserTC } from '../models/user';
let date = new Date();
import { ApolloError } from 'apollo-server';

borrowBookTC.addRelation('detailUser', {
  resolver: () => UserTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.idUser,
  },
  projection: { idUser: 1 },
});

borrowBookTC.addRelation('detailBook', {
  resolver: () => BookTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.idBook,
  },
  projection: { idBook: 1 },
});

export const rentBook = borrowBookTC.mongooseResolvers
  .createOne({
    record: { removeFields: ['_id', 'startPinjam', 'createdAt', 'updatedAt'] },
  })
  .wrapResolve((next) => async (rp) => {
    const {
      record: { idBook, pax: Pax, endPinjam },
    } = rp.args;
    const data = await Book.findById(idBook);
    if (data.pax < 1 || new Date(endPinjam).getTime() < new Date().getTime()) {
      throw new ApolloError(
        'error wether book in unvailable or wrong input date',
        '400'
      );
    } else {
      data.pax = data.pax - Pax;
    }
    rp.beforeRecordMutate = (record) => {
      record.startPinjam = new Date();
      record.status = true;
      return record;
    };
    const [dataBook] = await Promise.all([
      next(rp),
      Book.findByIdAndUpdate({ _id: idBook }, { $set: { pax: data.pax } }),
    ]);
    return dataBook;
  });

export const returnBook = borrowBookTC.mongooseResolvers
  .updateById()
  .wrapResolve((next) => async (rp) => {
    const { _id: userRef } = rp.args;
    const data = await borrowBook.findById(userRef);
    if (new Date().getTime() > data.endPinjam.getTime())
      throw new ApolloError('late to return the book');
    if (!data.status) throw new ApolloError('book has been return');
    rp.args.record = {
      status: false,
    };
    return next(rp);
  })
  .removeArg(['record']);

export const borrowBookConnection = borrowBookTC.mongooseResolvers
  .connection({
    defaultLimit: 10,
    findManyOpts: {
      filter: {
        removeFields: [
          '_id',
          'idBook',
          'createdAt',
          'updatedAt',
          'startPinjam',
          'endPinjam',
          'pax',
        ],
      },
    },
  })
  .addSortArg({
    name: '_DATE_ASC',
    value: {
      createdAt: 1,
    },
  });

export const borrowBookFindById = borrowBookTC.mongooseResolvers.findById();
