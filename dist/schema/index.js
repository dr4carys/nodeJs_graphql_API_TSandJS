"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlCompose = require("graphql-compose");

var _user = require("./user");

var _category = require("./category");

var _book = require("./book");

var _borrowBook = require("./borrowBook");

// import db from '../utils/db'; // eslint-disable-line no-unused-vars
const schemaComposer = new _graphqlCompose.SchemaComposer(); // import { schemaComposer } from 'graphql-compose';

schemaComposer.Query.addFields({
  userFindById: _user.userFindById,
  bookFindById: _book.bookFindById,
  bookFindMany: _book.bookFindMany,
  categoryFindById: _category.categoryFindById
});
schemaComposer.Mutation.addFields({
  rentBook: _borrowBook.rentBook,
  returnBook: _borrowBook.returnBook,
  userCreateOne: _user.userCreateOne,
  userUpdateById: _user.userUpdateById,
  bookCreateOne: _book.bookCreateOne,
  bookUpdateById: _book.bookUpdateById,
  categoryCreateOne: _category.categoryCreateOne
});
exports.default = schemaComposer.buildSchema();