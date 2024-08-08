import { Product } from "@prisma/client";
import { CatalogRepository, CreateProduct } from "../model";

export class ProductCreator {
  constructor(private catalogInfrastructure: CatalogRepository) {}

  async createProduct(data: unknown): Promise<Product> {
    const createProduct = data as CreateProduct;
    return this.catalogInfrastructure.createProduct(createProduct);
  }
}
