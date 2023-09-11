const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: "User 1",
      email: "user1@example.com",
      password: "password1",
      posts: {
        create: [
          {
            description: "Post 1 by User 1",
            url: "https://example.com/post1",
          },
          {
            description: "Post 2 by User 1",
            url: "https://example.com/post2",
          },
        ],
      },
      likes: {
        create: [
          {
            post: {
              create: {
                description: "Post 3 by User 1",
                url: "https://example.com/post3",
              },
            },
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "User 2",
      email: "user2@example.com",
      password: "password2",
      posts: {
        create: [
          {
            description: "Post 4 by User 2",
            url: "https://example.com/post4",
          },
        ],
      },
      likes: {
        create: [
          {
            post: {
              create: {
                description: "Post 1 by User 1", // Liked by User 2
                url: "https://example.com/post1",
              },
            },
          },
        ],
      },
    },
  });

  console.log("Seed data created:", { user1, user2 });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
