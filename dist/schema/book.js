"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookFindMany = exports.bookUpdateById = exports.bookFindById = exports.bookCreateOne = undefined;

var _apolloServerExpress = require("apollo-server-express");

var _book = require("../models/book");

var _category = require("../models/category");

_book.BookTC.addRelation('categoryDetail', {
  resolver: () => _category.CategoryTC.mongooseResolvers.dataLoader({
    lean: true
  }),
  prepareArgs: {
    _id: source => source.category
  },
  projection: {
    category: 1
  }
});

const bookCreateOne = exports.bookCreateOne = _book.BookTC.mongooseResolvers.createOne({
  lean: true
});

const bookFindById = exports.bookFindById = _book.BookTC.mongooseResolvers.findById({
  lean: true
});

const bookUpdateById = exports.bookUpdateById = _book.BookTC.mongooseResolvers.updateById().wrapResolve(next => async rp => {
  const {
    _id,
    record: {
      pax
    }
  } = rp.args;
  const data = await _book.Book.findOne({
    _id
  }, {
    pax: 1
  });
  data.pax = data.pax + pax;

  if (pax) {
    if (data.pax < 1) data.pax = 0;
    rp.args.record = {
      pax: data.pax
    };
  }

  return next(rp);
});

const bookFindMany = exports.bookFindMany = _book.BookTC.mongooseResolvers.findMany({
  lean: true,
  filter: {
    removeFields: ['category', 'pax', 'bookTitle']
  }
}).addFilterArg({
  name: 'text',
  type: 'String!',
  description: 'search by text',
  filterTypeNameFallback: 'FilterTextInput',
  query: (query, value) => {
    query.bookTitle = new RegExp(`^${value}`, 'i');
  }
}).removeArg(['sort', 'skip', 'limit']);