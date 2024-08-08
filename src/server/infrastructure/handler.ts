import { PrismaClient } from "@prisma/client";
import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { InvalidCreateProductError } from "../../catalog/model";
import { DBUniqueConstraintError } from "../../database/model";

export function createErrorHandler(fastify: FastifyInstance) {
  return function errorHandler(
    error: any,
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    if ("toJSON" in error) {
      fastify.log.error(error.toJSON());
    } else {
      fastify.log.error(error);
    }

    if (error instanceof InvalidCreateProductError) {
      return reply.status(400).send(error.toJSON());
    } else if (error instanceof DBUniqueConstraintError) {
      return reply.status(409).send(error.toJSON());
    }

    reply.status(500).send({
      error: "internal server error",
      message: "unexpected error occurred",
    });
  };
}

export function createHandler(server: FastifyInstance, prisma: PrismaClient) {
  server.register(require("../../catalog/presentation/router"), {
    prefix: "/catalog",
    prisma,
  });
}
