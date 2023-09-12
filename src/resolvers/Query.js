async function posts(parent, args, context, info) {
  const posts = await context.prisma.post.findMany();

  return posts;
}

async function users(parent, args, context, info) {
  const users = await context.prisma.user.findMany();
  console.log("users found: ", users);
  return users;
}

module.exports = {
  posts,
  users,
};
