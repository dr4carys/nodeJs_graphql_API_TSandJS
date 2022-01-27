"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryTC = exports.Category = exports.categorySchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require("mongoose-timestamp");

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categorySchema = exports.categorySchema = new _mongoose.Schema({
  nameCategory: {
    type: String,
    required: true
  }
});
categorySchema.plugin(_mongooseTimestamp2.default);
categorySchema.index({
  _id: 1
});

const Category = exports.Category = _mongoose2.default.model('Category', categorySchema);

const CategoryTC = exports.CategoryTC = (0, _graphqlComposeMongoose.composeMongoose)(Category, {
  onlyFields: ['_id', 'nameCategory']
});