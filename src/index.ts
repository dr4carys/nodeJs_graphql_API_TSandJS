import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
// import bearer from './middleware/bearer';
import './utils/db';
import { graphqlSchema } from './schema';

dotenv.config();

const app = express();

const server = new ApolloServer({
  schema: graphqlSchema,
  context: ({ req }) => {
      req;
      // TODO:well do it later
  },
});

async function connection() {
  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: true,
    onHealthCheck: () =>
      new Promise((resolve: any, reject) => {
        if (mongoose.connection.readyState > 0) {
          resolve(console.log('berhasil'));
        } else {
          reject(console.log(' gaberhasil'));
        }
      }),
  });
}

connection();
app.listen({ port: process.env.PORT }, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT}`);
  console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});
