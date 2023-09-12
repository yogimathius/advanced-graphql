const resolvers = {
  Query: {
    users: () => async (parent, args, context, info) => {
      console.log("finding users: ", mcontext.prisma.user.findMany());
      return context.prisma.user.findMany();
    },
    posts: () => async (parent, args, context, info) => {
      console.log(context.prisma.post.findMany());
      return context.prisma.post.findMany();
    },
  },
};

module.exports = resolvers;
