"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnBook = exports.rentBook = undefined;

var _express = require("express");

var _book = require("../models/book");

var _borrowBook = require("../models/borrowBook");

var _user = require("../models/user");

var _apolloServer = require("apollo-server");

let date = new Date();

_borrowBook.borrowBookTC.addRelation('detailUser', {
  resolver: () => _user.UserTC.mongooseResolvers.dataLoader({
    lean: true
  }),
  prepareArgs: {
    _id: source => source.idUser
  },
  projection: {
    idUser: 1
  }
});

_borrowBook.borrowBookTC.addRelation('detailBook', {
  resolver: () => _book.BookTC.mongooseResolvers.dataLoader({
    lean: true
  }),
  prepareArgs: {
    _id: source => source.idBook
  },
  projection: {
    idBook: 1
  }
});

const rentBook = exports.rentBook = _borrowBook.borrowBookTC.mongooseResolvers.createOne({
  record: {
    removeFields: ['_id', 'startPinjam', 'createdAt', 'updatedAt']
  }
}).wrapResolve(next => async rp => {
  const {
    record: {
      idBook,
      pax: Pax,
      endPinjam
    }
  } = rp.args;
  const data = await _book.Book.findById(idBook);

  if (data.pax < 1 || new Date(endPinjam).getTime() < new Date().getTime()) {
    throw new _apolloServer.ApolloError('error wether book in unvailable or wrong input date', '400');
  } else {
    data.pax = data.pax - Pax;
  }

  rp.beforeRecordMutate = record => {
    record.startPinjam = new Date();
    record.status = true;
    return record;
  };

  const [dataBook] = await Promise.all([next(rp), _book.Book.findByIdAndUpdate({
    _id: idBook
  }, {
    $set: {
      pax: data.pax
    }
  })]);
  return dataBook;
});

const returnBook = exports.returnBook = _borrowBook.borrowBookTC.mongooseResolvers.updateById().wrapResolve(next => async rp => {
  const {
    _id: userRef
  } = rp.args;
  const data = await _borrowBook.borrowBook.findById(userRef);
  if (new Date().getTime() > data.endPinjam.getTime()) throw new _apolloServer.ApolloError('late to return the book');

  rp.beforeRecordMutate = record => {
    record.status = false;
  };

  rp.args.record = {};
  return next(rp);
}).removeArg(['record']); // export const getAllBookById = borrowBookTC.mongooseResolvers.findMany().wrap