import { PrismaClient } from "@prisma/client";
import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

export function createErrorHandler(fastify: FastifyInstance) {
  return function errorHandler(
    error: any,
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    switch (error.name) {
      case "InvalidCreateProductError":
        fastify.log.error(error.toJSON());
        reply.status(400).send(error.toJSON());
        return;
      case "PrismaUniqueConstraintError":
        fastify.log.error(error.toJSON());
        reply.status(409).send(error.toJSON());
        return;
      default:
        fastify.log.error(error);
        reply.status(500).send({
          error: "internal server error",
          message: "unexpected error occurred",
        });
        return;
    }
  };
}

export function createHandler(server: FastifyInstance, prisma: PrismaClient) {
  server.register(require("../../catalog/presentation/router"), {
    prefix: "/catalog",
    prisma,
  });
}
