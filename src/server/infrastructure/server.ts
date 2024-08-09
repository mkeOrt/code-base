import fastify, { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { createErrorHandler } from "./handler";
import { Config } from "../../config/config";

export class Server {
  private readonly fastify: FastifyInstance;
  private readonly config: Config = Config.getInstance();

  constructor(prisma: PrismaClient) {
    this.fastify = fastify({ logger: true });

    this.createHandler(prisma);
  }

  public async start() {
    try {
      await this.fastify.listen({ port: this.config.port });
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

    this.fastify.register(require("../../auth/presentation/v1-router"), {
      prefix: "v1/auth",
      prisma,
    });
  }
}
