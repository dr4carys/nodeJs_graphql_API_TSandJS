"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlCompose = require("graphql-compose");

var _db = require("../utils/db");

var _db2 = _interopRequireDefault(_db);

var _user = require("./user");

var _task = require("./task");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
const schemaComposer = new _graphqlCompose.SchemaComposer();
schemaComposer.Query.addFields({
  ambilData: _task.ambilData,
  findUser: _user.findUser,
  findManyUser: _user.findManyUser
});
schemaComposer.Mutation.addFields({
  CreateTaskData: _task.CreateTaskData,
  userCreateOne: _user.userCreateOne,
  UpdateUser: _user.UpdateUser,
  createWeb: _user.createWeb
});
exports.default = schemaComposer.buildSchema();