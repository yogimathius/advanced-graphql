const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const Query = require("./resolvers/Query");
const User = require("./resolvers/User");
const Post = require("./resolvers/Post");

const resolvers = {
  Query,
  User,
  Post,
};

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
