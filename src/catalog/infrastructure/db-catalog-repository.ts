import { PrismaClient, Product } from "@prisma/client";
import { CatalogInfrastructure, CreateProduct } from "../model";

export class DbCatalogRepository implements CatalogInfrastructure {
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
