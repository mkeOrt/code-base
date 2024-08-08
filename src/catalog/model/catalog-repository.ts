import { Product } from "@prisma/client";
import { CreateProductType } from "./value-objects";

export interface CatalogRepository {
  getProducts(): Promise<Product[]>;
  createProduct(product: CreateProductType): Promise<Product>;
}
