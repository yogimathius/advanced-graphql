const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  // Create users
  const postLikedByUser1 = {
    data: {
      title: "Seeking advice on home improvement projects 🏠",
      description:
        "Looking to renovate my kitchen. Any DIY tips? #HomeImprovement",
    },
  };

  const user1 = await prisma.user.create({
    data: {
      name: "Helpful Hannah",
      email: "hannah@example.com",
      password: "supportive1",
      posts: {
        create: [
          {
            title: "Offering tech help for coding questions 🖥️",
            description:
              "If you're stuck on a coding problem, I'm here to help! #CodingHelp",
          },
          {
            title: "Looking for gardening advice 🌱",
            description:
              "I'm a newbie gardener and could use some tips. #Gardening",
          },
          postLikedByUser1,
        ],
      },
    },
  });

  const postLikedByUser2 = {
    data: {
      title: "Looking for a captivating read. Any suggestions? 📚",
      description: "Liked 1 time",
    },
  };

  const user2 = await prisma.user.create({
    data: {
      name: "Resourceful Rob",
      email: "rob@example.com",
      password: "problemSolver2",
      posts: {
        create: [
          {
            title: "Offering car repair expertise 🚗",
            description: "Experienced mechanic ready to assist! #CarRepair",
          },
          postLikedByUser2,
        ],
      },
    },
  });

  // Create posts liked by users

  // Create likes
  await prisma.like.create({
    data: {
      user: user2,
      post: postLikedByUser2,
    },
  });

  console.log("Seed data created:", { user1, user2 });
}

seed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
