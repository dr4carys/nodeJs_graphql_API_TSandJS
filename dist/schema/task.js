"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ambilData = exports.CreateTaskData = undefined;

var _express = require("express");

var _task = require("../models/task");

var _user = require("../models/user");

const CreateTaskData = exports.CreateTaskData = _task.TaskTC.mongooseResolvers.createOne({
  lean: true
});

_user.UserTC.addResolver({
  name: 'ambildata',
  type: [_user.UserTC],
  resolve: async rp => {
    console.log(rp);
    const data = await _user.User.find({
      name: rp.name
    });
    console.log('this is data >>>>', data);
    return data;
  }
});

_task.TaskTC.addRelation('data_user', {
  resolver: () => _user.UserTC.getResolver('ambildata'),
  prepareArgs: {
    user: source => ({
      user: source.user
    })
  },
  projection: {
    name: 1,
    email: 1
  }
});

const ambilData = exports.ambilData = _task.TaskTC.mongooseResolvers.findOne({
  lean: true
}); // const TaskQuery = {
//     taskById: TaskTC.getResolver('findById'),
//     taskByIds: TaskTC.getResolver('findByIds'),
//     taskOne: TaskTC.getResolver('findOne'),
//     taskMany: TaskTC.getResolver('findMany'),
//     taskCount: TaskTC.getResolver('count'),
//     taskConnection: TaskTC.getResolver('connection'),
//     taskPagination: TaskTC.getResolver('pagination'),
// };
// const TaskMutation = {
//     taskCreateOne: TaskTC.getResolver('createOne'),
//     taskCreateMany: TaskTC.getResolver('createMany'),
//     taskUpdateById: TaskTC.getResolver('updateById'),
//     taskUpdateOne: TaskTC.getResolver('updateOne'),
//     taskUpdateMany: TaskTC.getResolver('updateMany'),
//     taskRemoveById: TaskTC.getResolver('removeById'),
//     taskRemoveOne: TaskTC.getResolver('removeOne'),
//     taskRemoveMany: TaskTC.getResolver('removeMany'),
// };
// export { TaskQuery, TaskMutation };