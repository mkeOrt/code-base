import { PrismaClient } from "@prisma/client";
import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { InvalidCreateProductError } from "../../catalog/model";
import { DBUniqueConstraintError } from "../../database/model";
import { CredentialsNotMatchError } from "../../auth/model";
import { InvalidLoginCredentials } from "../../auth/model/exceptions";

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
    } else if (error instanceof CredentialsNotMatchError) {
      return reply.status(401).send(error.toJSON());
    } else if (error instanceof InvalidLoginCredentials) {
      return reply.status(400).send(error.toJSON());
    }

    reply.status(500).send({
      error: "internal server error",
      message: "unexpected error occurred",
    });
  };
}
