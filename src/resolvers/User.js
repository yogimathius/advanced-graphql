function posts(parent, args, context) {
  console.log(
    "looking for posts: ",
    context.prisma.user.findUnique({ where: { id: parent.id } })
  );
  return context.prisma.user.findUnique({ where: { id: parent.id } }).posts();
}

module.exports = {
  posts,
};
