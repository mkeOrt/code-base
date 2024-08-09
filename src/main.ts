import "dotenv/config";

import { Server } from "./server/infrastructure";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const server = new Server(prisma);
  server.start();
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
