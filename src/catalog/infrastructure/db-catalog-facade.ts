import { PrismaClient, Product } from "@prisma/client";
import { CatalogRepository, CreateProduct } from "../model";

export class DbCatalogFacade implements CatalogRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public getProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  public async createProduct(product: CreateProduct): Promise<Product> {
    const createdProduct = await this.prisma.product.create({
      data: product,
    });

    return createdProduct;
  }
}
