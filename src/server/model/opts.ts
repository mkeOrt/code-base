import { PrismaClient } from "@prisma/client";

export type Opts = {
  prefix: string;
  prisma: PrismaClient;
};
