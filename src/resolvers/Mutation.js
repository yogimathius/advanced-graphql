async function addPost(parent, args, context, info) {
  console.log(args);

  const postCreated = await context.prisma.post.create({
    data: {
      title: args.title,
      content: args.content,
      author: parseInt(args.userId),
      author: {
        connect: {
          id: parseInt(args.userId),
        },
      },
    },
  });

  console.log("created post! ", postCreated);
  return postCreated;
}

module.exports = {
  addPost,
};
