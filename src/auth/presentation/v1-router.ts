import { FastifyInstance } from "fastify";
import { Opts } from "../../server/model";
import { DbAuthFacade, TokenGeneratorFacade } from "../infrastructure";
import { LoggerIn } from "../application";
import { AuthRepository, TokenGenerator } from "../model";
import { Config } from "../../config/config";

export default function (router: FastifyInstance, opts: Opts, done: Function) {
  const config = Config.getInstance();

  const authRepository: AuthRepository = new DbAuthFacade(opts.prisma);
  const tokenGenerator: TokenGenerator = new TokenGeneratorFacade(
    config.jwtPrivateKey,
    config.jwtPublicKey,
    {
      algorithm: "HS256",
      keyid: "1",
      noTimestamp: false,
      expiresIn: "2m",
      notBefore: "2s",
    }
  );

  router.post("/login", async (request, reply) => {
    const loggerIn = new LoggerIn(authRepository, tokenGenerator);

    const userId = await loggerIn.exec(request.body);
    return {
      item: userId,
    };
  });

  done();
}
