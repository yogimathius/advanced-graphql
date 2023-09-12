const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    authorId: ID!
    postedBy: User
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
  }
`;

module.exports = typeDefs;
