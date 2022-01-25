"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlCompose = require("graphql-compose");

var _db = require("../utils/db");

var _db2 = _interopRequireDefault(_db);

var _user = require("./user");

var _web = require("./web");

var _task = require("./task");

var _book = require("./book");

var _borrowBook = require("./borrowBook");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
const schemaComposer = new _graphqlCompose.SchemaComposer();
schemaComposer.Query.addFields({
  findManyUserCustom: _user.findManyUserCustom,
  ambilDataWeb: _user.ambilDataWeb,
  ambilData: _task.ambilData,
  findUser: _user.findUser,
  findManyUser: _user.findManyUser,
  findTaskByUser: _task.findTaskByUser,
  detailTask: _task.detailTask
});
schemaComposer.Mutation.addFields({
  createTask: _task.createTask,
  logIn: _user.logIn,
  signup: _user.signup,
  buat_web: _web.buat_web,
  CreateTaskData: _task.CreateTaskData,
  userCreateOne: _user.userCreateOne,
  UpdateUser: _user.UpdateUser,
  createWeb: _user.createWeb,
  editTaskByUser: _task.editTaskByUser,
  buatBuku: _book.buatBuku,
  pinjamBook: _borrowBook.pinjamBook,
  getBackBook: _borrowBook.getBackBook
});
exports.default = schemaComposer.buildSchema();