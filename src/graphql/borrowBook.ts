// import { query } from 'express';
import { Book, BookTC, IBookModel } from '../models/book';
import { borrowBook, borrowBookTC, IBorrowBookModel } from '../models/borrowBook';
import { UserTC } from '../models/user';
import { ResolverResolveParams } from 'graphql-compose/lib/Resolver';
import { RecordInterFace } from './type/interFace';

borrowBookTC.addRelation('detailUser', {
  resolver: () => UserTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source: IBorrowBookModel) => source.idUser,
  },
  projection: { idUser: 1 },
});

borrowBookTC.addRelation('detailBook', {
  resolver: () => BookTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source: IBorrowBookModel) => source.idBook,
  },
  projection: { idBook: 1 },
});

export const rentBook = borrowBookTC.mongooseResolvers
  .createOne({
    record: { removeFields: ['_id', 'startPinjam', 'createdAt', 'updatedAt'] },
  })
  .wrapResolve((next) => async (rp: ResolverResolveParams<any, any>) => {
    const {
      record: { idBook, pax: Pax, endPinjam },
    } = rp.args;
    const data = await Book.findById(idBook);
    if (data.pax < 1 || new Date(endPinjam).getTime() < new Date().getTime()) {
      throw new Error('error wether book in unvailable or wrong input date');
    } else {
      data.pax = data.pax - Pax;
    }
    rp.beforeRecordMutate = (record: RecordInterFace) => {
      record.startPinjam = new Date();
      record.status = true;
      return record;
    };
    const [dataBook] = await Promise.all<IBookModel>([
      next(rp),
      Book.findByIdAndUpdate({ _id: idBook }, { $set: { pax: data.pax } }),
    ]);
    return dataBook;
  });

export const returnBook = borrowBookTC.mongooseResolvers
  .updateById()
  .wrapResolve((next) => async (rp: ResolverResolveParams<any, any>) => {
    const { _id: userRef } = rp.args;
    const data = await borrowBook.findById(userRef);
    if (new Date().getTime() > data.endPinjam.getTime()) throw new Error('late to return the book');
    if (!data.status) throw new Error('book has been return');
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

export const borrowBookFindById = borrowBookTC.mongooseResolvers.findById();
