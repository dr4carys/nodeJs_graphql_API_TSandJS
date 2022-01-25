"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.borrowBookTC = exports.borrowBook = exports.borrowBookSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require("mongoose-timestamp");

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const borrowBookSchema = exports.borrowBookSchema = new _mongoose.Schema({
  idUser: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  idBook: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  startPinjam: {
    type: Date
  },
  endPinjam: {
    type: Date
  },
  status: {
    type: Boolean,
    required: true
  }
}, {
  collection: 'books'
});
borrowBookSchema.plugin(_mongooseTimestamp2.default);
borrowBookSchema.index({
  createdAt: 1,
  updatedAt: 1
});

const borrowBook = exports.borrowBook = _mongoose2.default.model('borrowBook', borrowBookSchema);

const borrowBookTC = exports.borrowBookTC = (0, _graphqlComposeMongoose.composeMongoose)(borrowBook);