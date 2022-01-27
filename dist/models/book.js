"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookTC = exports.Book = exports.bookSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require("mongoose-timestamp");

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bookSchema = exports.bookSchema = new _mongoose.Schema({
  bookTitle: {
    type: String,
    required: true
  },
  pax: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    ref: 'Category',
    required: true
  }
}, {
  collection: 'books'
});
bookSchema.plugin(_mongooseTimestamp2.default);
bookSchema.index({
  createdAt: 1,
  updatedAt: 1
});

const Book = exports.Book = _mongoose2.default.model('Book', bookSchema);

const BookTC = exports.BookTC = (0, _graphqlComposeMongoose.composeMongoose)(Book, {
  onlyFields: ['_id', 'bookTitle', 'pax', 'category']
});