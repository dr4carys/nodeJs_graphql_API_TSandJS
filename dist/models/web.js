"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebTC = exports.Web = exports.WebSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require("mongoose-timestamp");

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const WebSchema = exports.WebSchema = new _mongoose.Schema({
  header_picture: {
    type: String,
    trim: true
  },
  main_picture: {
    type: String,
    trim: true
  },
  botton_picture: {
    type: String,
    trim: true
  }
});
WebSchema.plugin(_mongooseTimestamp2.default);
WebSchema.index({
  createdAt: 1,
  updatedAt: 1
});

const Web = exports.Web = _mongoose2.default.model('Web', WebSchema);

const WebTC = exports.WebTC = (0, _graphqlComposeMongoose.composeMongoose)(Web);