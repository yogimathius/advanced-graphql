// 1
const { PrismaClient } = require("@prisma/client");

// 2
const prisma = new PrismaClient();

// 3
async function verify() {
  const allPosts = await prisma.post.findMany();
  console.log(allPosts);

  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

// 4
verify()
  .catch((e) => {
    throw e;
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
