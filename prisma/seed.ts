import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const playeraBen10 = await prisma.product.upsert({
    where: { name: "Playera Ben 10" },
    update: {},
    create: {
      name: "Playera Ben 10",
      price: 100,
      amount: 10,
    },
  });
  const playeraRonaldinho = await prisma.product.upsert({
    where: { name: "Playera Ronaldinho" },
    update: {},
    create: {
      name: "Playera Ronaldinho",
      price: 180,
      amount: 213,
    },
  });
  const blusaBarbie = await prisma.product.upsert({
    where: { name: "Blusa Barbie" },
    update: {},
    create: {
      name: "Blusa Barbie",
      price: 110,
      amount: 23,
    },
  });

  console.log({ playeraBen10, playeraRonaldinho });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
