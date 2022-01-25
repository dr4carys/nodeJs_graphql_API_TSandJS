// import dotenv from 'dotenv';
// import express from 'express';
// import { ApolloServer } from 'apollo-server-express';
// import mongoose from 'mongoose';
// import bearer from './middleware/bearer';
// import './utils/db';
// import schema from './schema';
// import getErrorCode from './utils/errorHandling';

// dotenv.config();

// const app = express();

// const server = new ApolloServer({
//     schema,
//     cors: true,
//     playground: process.env.NODE_ENV === 'development' ? true : false,
//     introspection: true,
//     tracing: true,
//     context: ({ req }) => {
//         req;
//         // console.log(req);
//         // bearer(req);
//         // console.log(req.headers['authorization']);
//         // const token = req.headers.authorization || '';
//         // console.log('SSSS', token);
//         // if (token != 'ganteng') {
//         //     throw new Error('no authroizatiin');
//         // }
//     },
// });

// async function connection() {
//     await server.start();
//     server.applyMiddleware({
//         app,
//         path: '/',
//         cors: true,
//         onHealthCheck: () =>
//             // eslint-disable-next-line no-undef
//             new Promise((resolve, reject) => {
//                 if (mongoose.connection.readyState > 0) {
//                     resolve();
//                 } else {
//                     reject();
//                 }
//             }),
//     });
// }

// connection();
// app.listen({ port: process.env.PORT }, () => {
//     console.log(`🚀 Server listening on port ${process.env.PORT}`);
//     console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
// });


// import { App } from './src';
// // import { VERSION } from "./src/config";
// import { ApolloServer } from 'apollo-server-koa';
// import { graphqlSchema } from './src/graphql';
// import Router from 'koa-router';
// // import bearer from './src/middleware/bearer';

// const router = new Router();
// const server = new ApolloServer({
//   schema: graphqlSchema,
//   context: (req) => ({
//     requestContext: req.ctx,
//     headers: req.ctx.headers,
//   }),
// });

// server.start().then(() => {
//   // bootstrap graphql router on stand-alone koa server
//   router.post('/graphql', server.getMiddleware());
//   App.use(router.routes());
//   console.log(`server listening on port 3400 on`);
//   App.listen(3400);
// });

// import { MONGO_DEBUG, MONGODB_URL } from './config';
// import { ApolloServer } from 'apollo-server-express';
// import schema from './schema';
// import express from 'express';
// import mongoose from 'mongoose';
// // import bearer from './src/middleware/bearer';

// let conn;
// const App = express();
// const router = express.Router();
// App.use(async () => {
//   if (conn === undefined) conn = await mongoose.connect(MONGODB_URL);
//   console.log(conn)
//   mongoose.set('debug', MONGO_DEBUG);
// });
// const server = new ApolloServer({
//   schema,
//   context: ({ req }) => ({
//     req,
//     // requestContext: req.ctx,
//     // headers: req.ctx.headers,
//   }),
// });
// console.log(server)
// server.start().then(() => {
//   router.post('/graphql', server.getMiddleware());
//   App.listen(3400);
// });
