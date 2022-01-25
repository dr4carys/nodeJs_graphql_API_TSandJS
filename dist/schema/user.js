"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userCreateOne = exports.findManyUserCustom = exports.findManyUser = exports.findUser = exports.UpdateUser = exports.signup = exports.userWrap = exports.ambilDataWeb = exports.logIn = exports.createWeb = undefined;

var _user = require("../models/user");

var _web = require("../models/web");

var _graphqlCompose = require("graphql-compose");

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const jwkToPem = require('jwk-to-pem');

const jwt = require('jsonwebtoken');

global.fetch = require('node-fetch');
const poolData = {
  UserPoolId: process.env.USERPOOLID,
  // Your user pool id here
  ClientId: process.env.CLIENTID // Your client id here

};
const pool_region = process.env.POOL_REGION;
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

_user.UserTC.addResolver({
  name: 'createUser',
  args: {
    email: 'String',
    password: 'String',
    name: 'String',
    phone: 'String'
  },
  type: _user.UserTC,
  kind: 'mutation',
  resolve: async rp => {
    let attributelist = []; // console.log('INI BRAM', rp.args);

    attributelist.push(new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: 'name',
      Value: rp.args.name
    }));
    attributelist.push(new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: 'phone_number',
      Value: parseInt(rp.args.phone)
    }));
    attributelist.push(new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: 'email',
      Value: rp.args.email
    }));
    const data = userPool.signUp(rp.args.email, rp.args.password, attributelist, null);
    console.log('ini err', data);
    return data;
  }
});

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

_user.UserTC.addResolver({
  name: 'createWeb',
  args: {
    _id: 'String',
    web_template: ' String'
  },
  type: _user.UserTC,
  resolve: async rp => {
    console.log('cool', rp.args);
    let data = await _user.User.findByIdAndUpdate(rp.args._id, {
      $push: {
        web_template: rp.args.web_template
      }
    });
    return data;
  }
});

_user.UserTC.addResolver({
  name: 'customUser',
  args: {
    name: 'String'
  },
  type: [_user.UserTC],
  kind: 'query',
  resolve: async rp => {
    console.log('rp >>', rp.args.name);
    let data = await _user.User.find({
      name: rp.args.name
    });
    let kumData = []; // console.log('datacool', data[0].web_template);

    for (let b = 0; b < data[0].web_template.length; b++) {
      let baru = await _web.Web.findById(data[0].web_template[b]);

      if (baru != null) {
        kumData.push(baru);
      }
    }

    console.log('>> data', kumData);
    return kumData;
  }
});

const createWeb = exports.createWeb = _user.UserTC.getResolver('createWeb');

_user.UserTC.addResolver({
  name: 'login',
  args: {
    email: 'String',
    password: 'String'
  },
  type: _user.UserTC,
  kind: 'query',
  resolve: async rp => {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: rp.args.email,
      Password: rp.args.password
    });
    var userData = {
      Username: rp.args.email,
      Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log('access token + ' + result.getAccessToken().getJwtToken());
        console.log('id token + ' + result.getIdToken().getJwtToken());
        console.log('refresh token + ' + result.getRefreshToken().getToken());
      },
      onFailure: function (err) {
        console.log(err);
      }
    });
    const data = {
      login: {
        status: 200,
        message: ' berhasil'
      }
    };
    return data;
  }
});

const logIn = exports.logIn = _user.UserTC.getResolver('login');

_user.UserTC.addRelation('ambilData', {
  resolver: () => _web.WebTC.mongooseResolvers.dataLoaderMany({
    lean: true
  }),
  prepareArgs: {
    _ids: source => source.web_template
  },
  projection: {
    web_template: 1
  }
});

const ambilDataWeb = exports.ambilDataWeb = _user.UserTC.mongooseResolvers.findById();

const userWrap = exports.userWrap = newResolver => {
  // this resolver will expect bridgeRef and deviceRef as args
  newResolver.args = {
    name: {
      type: _graphqlCompose.schemaComposer.getSTC('String')
    }
  };
  return newResolver;
};

const signup = exports.signup = _user.UserTC.getResolver('createUser');

const UpdateUser = exports.UpdateUser = _user.UserTC.getResolver('updateUser');

const findUser = exports.findUser = _user.UserTC.mongooseResolvers.findById({
  lean: true
});

const findManyUser = exports.findManyUser = _user.UserTC.mongooseResolvers.findMany({
  lean: true,
  filter: {
    removeFields: ['_id', 'email', 'no_hp', 'alamat', 'updatedAt', 'createdAt', 'ambilData', 'web_template', 'OR', 'AND'],
    isRequired: true
  }
}).addFilterArg({
  name: 'name',
  type: 'String',
  description: 'test',
  query: (query, value) => {
    // sometimes email is in the form of a+10@gmail.com
    query.name = value;
  }
}).removeArg(['sort', 'skip', 'limit']);

const findManyUserCustom = exports.findManyUserCustom = _user.UserTC.getResolver('customUser'); // export const banyakData = UserTC.getResolver('test');


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