const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const resolvers = require("./resolvers");
/**
 * Creation of the server
 * Creation has to be asynchronous as importing the schema is not a synchronous operation
 *
 */

const start = async () => {
  const server = new ApolloServer({
    typeDefs: await importSchema("./schema/schema.graphql"),
    resolvers,
  });

  server.listen().then(({ url }) => {
    console.log("Running " + url);
  });
};

start();
