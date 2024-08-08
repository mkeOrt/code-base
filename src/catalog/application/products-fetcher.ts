import { Product } from "@prisma/client";
import { CatalogRepository } from "../model";

export class ProductsFetcher {
  constructor(private readonly catalogInfrastructure: CatalogRepository) {}

  public async exec(): Promise<Product[]> {
    return this.catalogInfrastructure.getProducts();
  }
}
