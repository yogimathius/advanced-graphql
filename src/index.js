const { ApolloServer, gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const typeDefs = gql`
  type Post {
    id: Int
    createdAt: String
    description: String
    url: String
    postedBy: User
    likes: [Like]
  }

  type User {
    id: Int
    name: String
    email: String
    password: String
    posts: [Post]
    likes: [Like]
  }

  type Like {
    id: Int
    post: Post
    user: User
  }

  type Query {
    posts: [Post]
    users: [User]
    likes: [Like]
  }
`;

const resolvers = {
  Query: {
    posts: () => prisma.post.findMany(),
    users: () => prisma.user.findMany(),
    likes: () => prisma.like.findMany(),
  },
  Post: {
    postedBy: (parent) =>
      prisma.post.findUnique({ where: { id: parent.id } }).postedBy(),
    likes: (parent) =>
      prisma.post.findUnique({ where: { id: parent.id } }).likes(),
  },
  User: {
    posts: (parent) =>
      prisma.user.findUnique({ where: { id: parent.id } }).posts(),
    likes: (parent) =>
      prisma.user.findUnique({ where: { id: parent.id } }).likes(),
  },
  Like: {
    post: (parent) =>
      prisma.like.findUnique({ where: { id: parent.id } }).post(),
    user: (parent) =>
      prisma.like.findUnique({ where: { id: parent.id } }).user(),
  },
};

const server = new ApolloServer({ typeDefs, resolvers, playground: true });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
