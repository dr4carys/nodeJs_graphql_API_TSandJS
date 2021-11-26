import { User, UserTC } from '../models/user';
import { Web, WebTC } from '../models/web';
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');
const poolData = {
    UserPoolId: process.env.USERPOOLID, // Your user pool id here
    ClientId: process.env.CLIENTID, // Your client id here
};
const pool_region = process.env.POOL_REGION;
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
UserTC.addResolver({
    name: 'createUser',
    args: {
        email: 'String',
        password: 'String',
        name: 'String',
        phone: 'String',
    },
    type: UserTC,
    kind: 'mutation',
    resolve: async (rp) => {
        let attributelist = [];
        // console.log('INI BRAM', rp.args);
        attributelist.push(
            new AmazonCognitoIdentity.CognitoUserAttribute({
                Name: 'name',
                Value: rp.args.name,
            })
        );
        attributelist.push(
            new AmazonCognitoIdentity.CognitoUserAttribute({
                Name: 'phone_number',
                Value: parseInt(rp.args.phone),
            })
        );
        attributelist.push(
            new AmazonCognitoIdentity.CognitoUserAttribute({
                Name: 'email',
                Value: rp.args.email,
            })
        );
        userPool.signUp(
            rp.args.email,
            rp.args.password,
            attributelist,
            null,
            function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('user name is ', result.user);
            }
        );
    },
});

UserTC.addResolver({
    name: 'findBanyakUser',
    args: { name: 'String' },
    type: [UserTC],
    kind: 'query',
    resolve: async (rp) => {
        console.log(rp.args.name);
        const data = await User.find({ name: rp.args.name });
        console.log(data);
        return data;
    },
});
UserTC.addResolver({
    name: 'updateUser',
    args: { _id: 'String', name: 'String' },
    type: UserTC,
    resolve: async (rp) => {
        console.log(rp);
        const data = await User.updateOne(
            { _id: rp.args._id },
            { name: rp.args.name }
        );

        if (data.modifiedCount < 1) {
            throw new Error('gagal update');
        }
    },
});

UserTC.addResolver({
    name: 'createWeb',
    args: { _id: 'String', web_template: ' String' },
    type: UserTC,
    resolve: async (rp) => {
        console.log('cool', rp.args);
        let data = await User.findByIdAndUpdate(rp.args._id, {
            $push: { web_template: rp.args.web_template },
        });
        data = {
            data: {
                createWeb: {
                    name: '200',
                    email: '200',
                    web_template: '200',
                },
            },
        };
        return data;
    },
});
export const createWeb = UserTC.getResolver('createWeb');
UserTC.addResolver({
    name: 'login',
    args: { email: 'String', password: 'String' },
    type: UserTC,
    kind: 'query',
    resolve: async (rp) => {
        var authenticationDetails =
            new AmazonCognitoIdentity.AuthenticationDetails({
                Username: rp.args.email,
                Password: rp.args.password,
            });

        var userData = {
            Username: rp.args.email,
            Pool: userPool,
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log(
                    'access token + ' + result.getAccessToken().getJwtToken()
                );
                console.log('id token + ' + result.getIdToken().getJwtToken());
                console.log(
                    'refresh token + ' + result.getRefreshToken().getToken()
                );
            },
            onFailure: function (err) {
                console.log(err);
            },
        });
        const data = {
            login: {
                status: 200,
                message: ' berhasil',
            },
        };
        return data;
    },
});
export const logIn = UserTC.getResolver('login');

UserTC.addRelation('ambilData', {
    resolver: () => WebTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    prepareArgs: {
        _ids: (source) => source.web_template,
    },
    projection: { web_template: 1 },
});
export const ambilDataWeb = UserTC.mongooseResolvers.findById();

export const signup = UserTC.getResolver('createUser');
export const UpdateUser = UserTC.getResolver('updateUser');
export const findUser = UserTC.mongooseResolvers.findById({ lean: true });
export const findManyUser = UserTC.getResolver('findBanyakUser');
// export const banyakData = UserTC.getResolver('test');
export const userCreateOne = UserTC.mongooseResolvers
    .createOne({ lean: true })
    .wrapResolve((next) => async (rp) => {
        console.log(rp.args);
        const { record } = rp.args;
        console.log(record.email);
        const data = await User.find({ email: record.email });
        return next(rp);
    });
// userCreateMany: UserTC.mongooeResolvers.userCreateMany(),
// userUpdateById: UserTC.mongooseResolvers.userUpdateById(),
// userUpdateOne: UserTC.mongooseResolvers.userUpdateOne(),
// userUpdateMany: UserTC.mongooseResolvers.updateMany(),
// userRemoveById: UserTC.getResolver('removeById'),
// userRemoveOne: UserTC.getResolver('removeOne'),
// userRemoveMany: UserTC.getResolver('removeMany'),

// export { UserQuery, UserMutation };
