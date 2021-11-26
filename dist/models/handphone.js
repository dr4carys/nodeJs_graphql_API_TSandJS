"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneTC = exports.Phone = exports.phoneSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require("mongoose-timestamp");

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const phoneSchema = exports.phoneSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nama_phone: {
    type: String,
    required: true
  },
  model_phone: {
    type: String,
    required: true
  },
  IMEI_phone: {
    type: String,
    required: true
  }
});
phoneSchema.plugin(_mongooseTimestamp2.default);
phoneSchema.index({
  createdAt: 1,
  updatedAt: 1
});

const Phone = exports.Phone = _mongoose2.default.model('Phone', phoneSchema);

const PhoneTC = exports.PhoneTC = (0, _graphqlComposeMongoose.composeWithMongoose)(Phone);