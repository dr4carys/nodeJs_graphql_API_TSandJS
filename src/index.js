import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import bearer from './middleware/bearer';
import './utils/db';
import schema from './schema';

dotenv.config();

const app = express();

const server = new ApolloServer({
    schema,
    cors: true,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    context: ({ req }) => {
        req;
        // console.log(req);
        // bearer(req);
        // console.log(req.headers['authorization']);
        // const token = req.headers.authorization || '';
        // console.log('SSSS', token);
        // if (token != 'ganteng') {
        //     throw new Error('no authroizatiin');
        // }
    },
});

async function connection() {
    await server.start();
    server.applyMiddleware({
        app,
        path: '/',
        cors: true,
        onHealthCheck: () =>
            // eslint-disable-next-line no-undef
            new Promise((resolve, reject) => {
                if (mongoose.connection.readyState > 0) {
                    resolve();
                } else {
                    reject();
                }
            }),
    });
}

connection();
app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
    console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});
