const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    // Insert users
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
          ],
        },
      },
    });

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
          ],
        },
      },
    });

    console.log("Seed data created:", { user1, user2 });
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
