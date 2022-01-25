process.env['KMS_KEY_ID'] = 'xyz';

import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import { graphqlSchema } from './schema';
import fs from 'fs';

(async () => {
  const server = new ApolloServer({
    schema: graphqlSchema,
    context: (req) => ({req }),
  });

  const { data } = await server.executeOperation({
    query: getIntrospectionQuery(),
  });
  const schema = buildClientSchema(data);
  console.log(printSchema(schema));

  fs.writeFileSync('./schema.schema', printSchema(schema));
})();
