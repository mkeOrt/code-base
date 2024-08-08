import { PrismaClient, Product } from "@prisma/client";
import { CatalogRepository, CreateProductType } from "../model";
import {
  PRISMA_ERROR_CODES,
  PrismaUniqueConstraintError,
} from "../../database/model";

export class DbCatalogFacade implements CatalogRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public getProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  public async createProduct(product: CreateProductType): Promise<Product> {
    try {
      const createdProduct = await this.prisma.product.create({
        data: product,
      });

      return createdProduct;
    } catch (error: any) {
      if (error.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT) {
        throw new PrismaUniqueConstraintError(
          "a product with the same identifier already exists in the database. Please use a unique identifier.",
          `fields: ${error.meta.target}`
        );
      }
      throw error;
    }
  }
}
