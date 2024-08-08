import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";

export function createHandler(server: FastifyInstance, prisma: PrismaClient) {
  server.register(require("../../catalog/presentation/router"), {
    prefix: "/catalog",
    prisma,
  });
}
