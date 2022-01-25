"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detailTask = exports.findTaskByUser = exports.editTaskByUser = exports.createTask = exports.ambilData = exports.CreateTaskData = undefined;

var _express = require("express");

var _task = require("../models/task");

var _user = require("../models/user");

const CreateTaskData = exports.CreateTaskData = _task.TaskTC.mongooseResolvers.createOne({
  lean: true
}); // UserTC.addResolver({
//     name: 'ambildata',
//     type: [UserTC],
//     resolve: async (rp) => {
//         console.log(rp);
//         const data = await User.find({ name: rp.name });
//         console.log('this is data >>>>', data);
//         return data;
//     },
// });


_task.TaskTC.addRelation('data_user', {
  resolver: () => _user.UserTC.mongooseResolvers.findOne({
    lean: true
  }).removeArg(['filter', 'skip', 'sort']),
  prepareArgs: {
    _id: source => ({
      _id: source._id
    })
  },
  projection: {
    name: 1,
    email: 1
  }
});

const ambilData = exports.ambilData = _task.TaskTC.mongooseResolvers.findOne({
  lean: true
});

const createTask = exports.createTask = _task.TaskTC.mongooseResolvers.createOne().wrapResolve(next => async rp => {
  console.log(rp);
  const data = await _user.User.find({
    id: rp.args.user
  });
  if (!data) throw new Error('cannot find userName');
  return next(rp);
});

const editTaskByUser = exports.editTaskByUser = _task.TaskTC.mongooseResolvers.updateById({
  record: {
    removeFields: ['user', 'createdAt', 'updatedAt', '_id']
  }
});

const findTaskByUser = exports.findTaskByUser = _task.TaskTC.mongooseResolvers.findMany({
  filter: {
    requiredFields: ['user'],
    removeFields: ['_id', 'task', 'description', 'createdAt', 'updatedAt', 'OR', 'AND']
  }
}).removeArg(['skip', 'limit', 'sort']);

const detailTask = exports.detailTask = _task.TaskTC.mongooseResolvers.findById();