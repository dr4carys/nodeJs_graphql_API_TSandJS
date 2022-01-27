"use strict";

var _graphql = require("graphql");

var _apolloServerExpress = require("apollo-server-express");

var _schema = require("./schema");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env['KMS_KEY_ID'] = 'xyz';

(async () => {
  const server = new _apolloServerExpress.ApolloServer({
    schema: _schema.graphqlSchema,
    context: req => ({
      req
    })
  });
  const {
    data
  } = await server.executeOperation({
    query: (0, _graphql.getIntrospectionQuery)()
  });
  const schema = (0, _graphql.buildClientSchema)(data);
  console.log((0, _graphql.printSchema)(schema));

  _fs2.default.writeFileSync('./schema.schema', (0, _graphql.printSchema)(schema));
})();