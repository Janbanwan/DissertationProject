const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const resolvers = require("./resolvers");

const start = async () => {
  const server = new ApolloServer({
    typeDefs: await importSchema("./schema/schema.graphql"),
    resolvers
  });

  server.listen().then(({ url }) => {
    console.log("Running " + url);
  });
};

start();
