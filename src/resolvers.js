const { users, posts } = require("./data");

const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
  },
};

module.exports = resolvers;
