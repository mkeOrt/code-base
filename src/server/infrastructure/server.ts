import fastify, { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { createErrorHandler } from "./handler";

export class Server {
  private fastify: FastifyInstance;

  constructor(prisma: PrismaClient) {
    this.fastify = fastify({ logger: true });

    this.createHandler(prisma);
  }

  public async start() {
    try {
      await this.fastify.listen({ port: 3000 });
    } catch (err) {
      this.fastify.log.error(err);
      process.exit(1);
    }
  }

  private createHandler(prisma: PrismaClient) {
    this.fastify.get("/healthcheck", (req, res) => {
      res.send({ message: "Success" });
    });

    this.fastify.setErrorHandler(createErrorHandler(this.fastify));

    this.fastify.register(require("../../catalog/presentation/v1-router"), {
      prefix: "v1/catalog",
      prisma,
    });
  }
}
