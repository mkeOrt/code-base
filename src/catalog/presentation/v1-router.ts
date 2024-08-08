import { FastifyInstance } from "fastify";
import { ProductCreator, ProductsFetcher } from "../application";
import { DbCatalogFacade } from "../infrastructure";
import { Opts } from "../../server/model";

export default function (router: FastifyInstance, opts: Opts, done: Function) {
  const catalogInfrastructure = new DbCatalogFacade(opts.prisma);

  router.get("/", async (request, reply) => {
    const productsFetcher = new ProductsFetcher(catalogInfrastructure);
    const products = await productsFetcher.exec();
    return {
      items: products,
      length: products.length,
    };
  });

  router.post("/", async (request, reply) => {
    const productCreator = new ProductCreator(catalogInfrastructure);

    try {
      const product = await productCreator.exec(request.body);
      return {
        item: product,
      };
    } catch (error: any) {
      switch (error.name) {
        case "InvalidCreateProductError":
          router.log.error(error.toJSON());
          reply.status(400).send(error.toJSON());
          return;
        case "PrismaUniqueConstraintError":
          router.log.error(error.toJSON());
          reply.status(409).send(error.toJSON());
          return;
        default:
          router.log.error(error);
          reply.status(500).send({
            error: "internal server error",
            message: "unexpected error occurred",
          });
          return;
      }
    }
  });

  done();
}
