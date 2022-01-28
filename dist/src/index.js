"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const mongoose_1 = __importDefault(require("mongoose"));
// import bearer from './middleware/bearer';
require("./utils/db");
const schema_1 = require("./schema");
// import getErrorCode from './utils/errorHandling';
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = new apollo_server_express_1.ApolloServer({
    schema: schema_1.graphqlSchema,
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
        path: '/graphql',
        cors: true,
        onHealthCheck: () => new Promise((resolve, reject) => {
            if (mongoose_1.default.connection.readyState > 0) {
                resolve();
            }
            else {
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
//# sourceMappingURL=index.js.map