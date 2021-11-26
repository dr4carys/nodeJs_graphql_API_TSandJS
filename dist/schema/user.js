"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userCreateOne = exports.findManyUser = exports.findUser = exports.UpdateUser = exports.createWeb = undefined;

var _user = require("../models/user");

var _web = require("../models/web");

// const UserQuery = {
//     userById: UserTC.mongooseResolvers.findById(),
//     userByIds: UserTC.mongooseResolvers.findByIds(),
//     userOne: UserTC.mongooseResolvers.findOne(),
//     userMany: UserTC.mongooseResolvers.findMany(),
//     // userCount: UserTC.getResolver('count'),
//     // userConnection: UserTC.getResolver('connection'),
//     // userPagination: UserTC.getResolver('pagination'),
// };
_user.UserTC.addResolver({
  name: 'findBanyakUser',
  args: {
    name: 'String'
  },
  type: [_user.UserTC],
  kind: 'query',
  resolve: async rp => {
    console.log(rp.args.name);
    const data = await _user.User.find({
      name: rp.args.name
    });
    console.log(data);
    return data;
  }
});

_user.UserTC.addResolver({
  name: 'updateUser',
  args: {
    _id: 'String',
    name: 'String'
  },
  type: _user.UserTC,
  resolve: async rp => {
    console.log(rp);
    const data = await _user.User.updateOne({
      _id: rp.args._id
    }, {
      name: rp.args.name
    });

    if (data.modifiedCount < 1) {
      throw new Error('gagal update');
    }
  }
});

_web.WebTC.addResolver({
  name: 'createWeb',
  args: {
    _id: 'String',
    web_template: ' String'
  },
  type: _web.WebTC,
  resolve: async rp => {
    console.log(rp.args);
    const data = await _user.User.createOne({
      _id: rp.args._id
    }, {
      web_template: rp.args.web_template
    });
    console.log(data);
  }
});

const createWeb = exports.createWeb = _user.UserTC.getResolver('createWeb'); // UserTC.addResolver({
//     name: 'test',
//     args: [{ name: 'String!', email: 'String!' }],
//     type: UserTC,
//     resolve: async (rp) => {
//         console.log(rp);
//     },
// });


const UpdateUser = exports.UpdateUser = _user.UserTC.getResolver('updateUser');

const findUser = exports.findUser = _user.UserTC.mongooseResolvers.findById({
  lean: true
});

const findManyUser = exports.findManyUser = _user.UserTC.getResolver('findBanyakUser'); // export const banyakData = UserTC.getResolver('test');


const userCreateOne = exports.userCreateOne = _user.UserTC.mongooseResolvers.createOne({
  lean: true
}).wrapResolve(next => async rp => {
  console.log(rp.args);
  const {
    record
  } = rp.args;
  console.log(record.email);
  const data = await _user.User.find({
    email: record.email
  });
  return next(rp);
}); // userCreateMany: UserTC.mongooeResolvers.userCreateMany(),
// userUpdateById: UserTC.mongooseResolvers.userUpdateById(),
// userUpdateOne: UserTC.mongooseResolvers.userUpdateOne(),
// userUpdateMany: UserTC.mongooseResolvers.updateMany(),
// userRemoveById: UserTC.getResolver('removeById'),
// userRemoveOne: UserTC.getResolver('removeOne'),
// userRemoveMany: UserTC.getResolver('removeMany'),
// export { UserQuery, UserMutation };