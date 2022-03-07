import { App } from './src';
// import { VERSION } from "./src/config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { graphqlSchema } from './src/graphql';

const router = express.Router();
const server = new ApolloServer({
  schema: graphqlSchema,
  context: (req) => ({
    // requestContext: req.ctx,
    // headers: req.ctx.headers,
  }),
});

server.start().then(() => {
  // bootstrap graphql router on stand-alone koa server
  App.use(router.post('/graphql', server.getMiddleware()));
  // App.use(cors());
  // App.use(router.routes());
  console.log(`server listening on port 3001 on`);
  App.listen(3001);
});
