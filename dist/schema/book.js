"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buatBuku = undefined;

var _express = require("express");

var _book = require("../models/book");

const buatBuku = exports.buatBuku = _book.BookTC.mongooseResolvers.createOne({
  lean: true
}).wrapResolve(next => async rp => {
  const {
    record: {
      BookTitle
    }
  } = rp.args;
  const data = await _book.Book.findOne({
    BookTitle: BookTitle
  });
  if (!!data) throw new Error('buku udah ada');
  return next(rp);
});