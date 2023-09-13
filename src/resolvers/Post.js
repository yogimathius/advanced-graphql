async function postedBy(parent, args, context, info) {
  const author = await context.prisma.user.findFirst({
    where: {
      id: parent.authorId,
    },
  });

  return author;
}

module.exports = {
  postedBy,
};
