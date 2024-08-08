import { Product } from "@prisma/client";
import { CatalogInfrastructure, CreateProduct } from "../model";

export class ProductCreator {
  constructor(private catalogInfrastructure: CatalogInfrastructure) {}

  async createProduct(data: unknown): Promise<Product> {
    const createProduct = data as CreateProduct;
    return this.catalogInfrastructure.createProduct(createProduct);
  }
}
