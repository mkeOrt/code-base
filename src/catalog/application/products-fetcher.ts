import { Product } from "@prisma/client";
import { CatalogInfrastructure } from "../model";

export class ProductsFetcher {
  constructor(private readonly catalogInfrastructure: CatalogInfrastructure) {}

  public async exec(): Promise<Product[]> {
    return this.catalogInfrastructure.getProducts();
  }
}
