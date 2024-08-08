import { Product } from "@prisma/client";
import {
  CatalogRepository,
  CreateProduct,
  InvalidCreateProductError,
} from "../model";

export class ProductCreator {
  constructor(private catalogInfrastructure: CatalogRepository) {}

  async exec(data: unknown): Promise<Product> {
    let product;

    try {
      product = CreateProduct.parse(data);
    } catch (error: any) {
      throw new InvalidCreateProductError(
        "product data is invalid. Please ensure all required fields are filled correctly.",
        JSON.parse(error.message)
      );
    }

    return this.catalogInfrastructure.createProduct(product);
  }
}
