const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    authorId: ID!
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
  }
`;

module.exports = typeDefs;
