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
    ref: 'User',
    required: true
  },
  idBook: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  startPinjam: {
    type: Date,
    required: true
  },
  endPinjam: {
    type: Date,
    requited: true
  },
  status: {
    type: Boolean,
    required: true
  },
  pax: {
    type: Number,
    required: true
  }
}, {
  collection: 'borrowBooks'
});
borrowBookSchema.plugin(_mongooseTimestamp2.default);
borrowBookSchema.index({
  createdAt: 1,
  updatedAt: 1
});

const borrowBook = exports.borrowBook = _mongoose2.default.model('borrowBook', borrowBookSchema);

const borrowBookTC = exports.borrowBookTC = (0, _graphqlComposeMongoose.composeMongoose)(borrowBook, {
  onlyFields: ['_id', 'idUser', 'idBook', 'status', 'createdAt', 'updatedAt', 'startPinjam', 'endPinjam', 'pax']
});