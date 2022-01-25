"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBackBook = exports.pinjamBook = undefined;

var _express = require("express");

var _book = require("../models/book");

var _borrowBook = require("../models/borrowBook");

var _user = require("../models/user");

let date = new Date();

_borrowBook.borrowBookTC.addRelation('detialUser', {
  resolver: () => _user.UserTC.mongooseResolvers.dataLoaderMany({
    lean: true
  }),
  prepareArgs: {
    _id: source => source._id
  },
  projection: {
    idUser: 1
  }
});

_borrowBook.borrowBookTC.addRelation('detailBook', {
  resolver: () => _book.BookTC.mongooseResolvers.dataLoaderMany({
    lean: true
  }),
  prepareArgs: {
    _id: source => source._id
  },
  projection: {
    idBook: 1
  }
});

const pinjamBook = exports.pinjamBook = _borrowBook.borrowBookTC.mongooseResolvers.createOne({
  lean: true
}).wrapResolve(next => async rp => {
  console.log('>>>rp', rp);

  rp.beforeRecordMutate = record => {
    record.startPinjam = new Date();
    record.endPinjam = date.setDate(date.getDate() + 6);
    return record;
  };

  return next(rp);
});

const getBackBook = exports.getBackBook = _borrowBook.borrowBookTC.mongooseResolvers.findById().wrapResolve(next => async rp => {
  console.log(rp);
  const data = await next(rp);
  console.log(cool);
});