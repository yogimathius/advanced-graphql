async function posts(parent, args, context, info) {
  const posts = context.prisma.post.findMany();

  return posts;
}

async function users(parent, args, context, info) {
  console.log("retrieving users in query resolver");
  const users = context.prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  return users;
}

module.exports = {
  posts,
  users,
};
