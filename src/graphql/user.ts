import { UserTC } from '../models/user';
import { ResolverResolveParams } from 'graphql-compose/lib/Resolver';
const emailExp =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const emailRegex = new RegExp(emailExp);
const handPhoneExp = /^((\+62 8\d{2}([ -])|08\d{2}([ -]?)|\+628\d{2})\d{4}(\3\4)\d{2,5})$/i;

const handPhoneRegex = new RegExp(handPhoneExp);
const validatedInputResolver = (next: any) => async (rp: ResolverResolveParams<any, any>) => {
  const {
    record: { email, no_hp },
  } = rp.args;
  console.log(email);
  if (email) {
    if (!email.match(emailRegex)) throw new Error(' email is not valid ');
  }
  if (no_hp) {
    if (!no_hp.match(handPhoneRegex)) throw new Error(' phone number is not valid');
  }
  return next(rp);
};

export const userFindById = UserTC.mongooseResolvers.findById();
export const userCreateOne = UserTC.mongooseResolvers.createOne().wrapResolve(validatedInputResolver);
export const userUpdateById = UserTC.mongooseResolvers.updateById().wrapResolve(validatedInputResolver);

export const userConnection = UserTC.mongooseResolvers
  .connection({
    defaultLimit: 10,
  })
  .removeArg(['filter'])
  .addSortArg({
    name: '_NAME_ASC',
    value: {
      name: 1,
    },
  })
  .addSortArg({
    name: '_DATE_ASC',
    value: {
      date: 1,
    },
  });

// const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// const jwkToPem = require('jwk-to-pem');
// const jwt = require('jsonwebtoken');
// global.fetch = require('node-fetch');
// const poolData = {
//     UserPoolId: process.env.USERPOOLID, // Your user pool id here
//     ClientId: process.env.CLIENTID, // Your client id here
// };
// export const userDetailTC = schemaComposer.createObjectTC(`
// type userDetailResponse{
//     name: String,
//     header_picture: String,
//     main_picture: String,
//     botton_picture: String
// }
// `);
// const pool_region = process.env.POOL_REGION;
// const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
// UserTC.addResolver({
//     name: 'createUser',
//     args: {
//         email: 'String',
//         password: 'String',
//         name: 'String',
//         phone: 'String',
//     },
//     type: UserTC,
//     kind: 'mutation',
//     resolve: async (rp) => {
//         let attributelist = [];
//         // console.log('INI BRAM', rp.args);
//         attributelist.push(
//             new AmazonCognitoIdentity.CognitoUserAttribute({
//                 Name: 'name',
//                 Value: rp.args.name,
//             })
//         );
//         attributelist.push(
//             new AmazonCognitoIdentity.CognitoUserAttribute({
//                 Name: 'phone_number',
//                 Value: parseInt(rp.args.phone),
//             })
//         );
//         attributelist.push(
//             new AmazonCognitoIdentity.CognitoUserAttribute({
//                 Name: 'email',
//                 Value: rp.args.email,
//             })
//         );
//         const data = userPool.signUp(
//             rp.args.email,
//             rp.args.password,
//             attributelist,
//             null
//         );
//         console.log('ini err', data);
//         return data;
//     },
// });

// UserTC.addResolver({
//     name: 'findBanyakUser',
//     args: { name: 'String' },
//     type: [UserTC],
//     kind: 'query',
//     resolve: async (rp) => {
//         console.log(rp.args.name);
//         const data = await User.find({ name: rp.args.name });
//         console.log(data);
//         return data;
//     },
// });
// UserTC.addResolver({
//     name: 'updateUser',
//     args: { _id: 'String', name: 'String' },
//     type: UserTC,
//     resolve: async (rp) => {
//         console.log(rp);
//         const data = await User.updateOne(
//             { _id: rp.args._id },
//             { name: rp.args.name }
//         );

//         if (data.modifiedCount < 1) {
//             throw new Error('gagal update');
//         }
//     },
// });

// UserTC.addResolver({
//     name: 'createWeb',
//     args: { _id: 'String', web_template: ' String' },
//     type: UserTC,
//     resolve: async (rp) => {
//         console.log('cool', rp.args);
//         let data = await User.findByIdAndUpdate(rp.args._id, {
//             $push: { web_template: rp.args.web_template },
//         });
//         return data;
//     },
// });

// UserTC.addRelation('detail_web', {
//     resolver: () => WebTC.mongooseResolvers.dataLoaderMany({lean:true}),
//     prepareArgs:{
//         _ids: (source) => source.web_template
//     },
//     projection: { web_template: 1 },
// });
// userDetailTC.addResolver({
//     name: 'customUser',
//     args: { name: 'String' },
//     type: [userDetailTC],
//     kind: 'query',
//     resolve: async (rp) => {
//         console.log('rp >>', rp.args.name);
//         let kumData = []
//         let data = await User.find({ name: rp.args.name });
//         console.log(">>data",data)
//         for (let b = 0; b < data[0].web_template.length; b++) {
//             let baru = await Web.findById(data[0].web_template[b],{header_picture:1,main_picture:1,botton_picture:1});
//                 kumData.push(baru[0]={
//                     ...baru[0],
//                     ...{name:data[0].name}
//                 })
//             }
//         console.log(">>kumdata",kumData)
//         return kumData
//     },
// });
// export const createWeb = UserTC.getResolver('createWeb');
// UserTC.addResolver({
//     name: 'login',
//     args: { email: 'String', password: 'String' },
//     type: UserTC,
//     kind: 'query',
//     resolve: async (rp) => {
//         var authenticationDetails =
//             new AmazonCognitoIdentity.AuthenticationDetails({
//                 Username: rp.args.email,
//                 Password: rp.args.password,
//             });

//         var userData = {
//             Username: rp.args.email,
//             Pool: userPool,
//         };
//         var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
//         cognitoUser.authenticateUser(authenticationDetails, {
//             onSuccess: function (result) {
//                 console.log(
//                     'access token + ' + result.getAccessToken().getJwtToken()
//                 );
//                 console.log('id token + ' + result.getIdToken().getJwtToken());
//                 console.log(
//                     'refresh token + ' + result.getRefreshToken().getToken()
//                 );
//             },
//             onFailure: function (err) {
//                 console.log(err);
//             },
//         });
//         const data = {
//             login: {
//                 status: 200,
//                 message: ' berhasil',
//             },
//         };
//         return data;
//     },
// });
// export const logIn = UserTC.getResolver('login');

// UserTC.addRelation('ambilData', {
//     resolver: () => WebTC.mongooseResolvers.dataLoaderMany({ lean: true }),
//     prepareArgs: {
//         _ids: (source) => source.web_template,
//     },
//     projection: { web_template: 1 },
// });
// export const ambilDataWeb = UserTC.mongooseResolvers.findById();
// export const userWrap = (newResolver) => {
//     // this resolver will expect bridgeRef and deviceRef as args
//     newResolver.args = {
//         name: { type: schemaComposer.getSTC('String') },
//     };
//     return newResolver;
// };
// export const signup = UserTC.getResolver('createUser');
// export const UpdateUser = UserTC.getResolver('updateUser');
// export const findUser = UserTC.mongooseResolvers.findById({ lean: true });
// export const findManyUser = UserTC.mongooseResolvers
//     .findMany({
//         lean: true,
//         filter: {
//             removeFields: [
//                 '_id',
//                 'email',
//                 'no_hp',
//                 'alamat',
//                 'updatedAt',
//                 'createdAt',
//                 'ambilData',
//                 'OR',
//                 'AND',
//             ],
//             isRequired: true,
//         },
//     })
//     .addFilterArg({
//         name: 'name',
//         type: 'String',
//         description: 'test',
//         query: (query, value) => {
//             // sometimes email is in the form of a+10@gmail.com
//             query.name = value;
//         },
//     })
//     .removeArg(['sort', 'skip', 'limit']);

// export const findManyUserCustom = userDetailTC.getResolver('customUser');
// // export const banyakData = UserTC.getResolver('test');
// export const userCreateOne = UserTC.mongooseResolvers
//     .createOne({ lean: true })
//     .wrapResolve((next) => async (rp) => {
//         console.log(rp.args);
//         const { record } = rp.args;
//         console.log(record.email);
//         const data = await User.find({ email: record.email });
//         return next(rp);
//     });
// // userCreateMany: UserTC.mongooeResolvers.userCreateMany(),
// // userUpdateById: UserTC.mongooseResolvers.userUpdateById(),
// // userUpdateOne: UserTC.mongooseResolvers.userUpdateOne(),
// // userUpdateMany: UserTC.mongooseResolvers.updateMany(),
// // userRemoveById: UserTC.getResolver('removeById'),
// // userRemoveOne: UserTC.getResolver('removeOne'),
// // userRemoveMany: UserTC.getResolver('removeMany'),

// // export { UserQuery, UserMutation };
