import { FastifyInstance } from "fastify";
import { Opts } from "../../server/model";
import { DbAuthFacade } from "../infrastructure";
import { LoggerIn } from "../application";

export default function (router: FastifyInstance, opts: Opts, done: Function) {
  const authRepository = new DbAuthFacade(opts.prisma);

  router.post("/login", async (request, reply) => {
    const loggerIn = new LoggerIn(authRepository);

    const userId = await loggerIn.exec(request.body);
    return {
      item: userId,
    };
  });

  done();
}
