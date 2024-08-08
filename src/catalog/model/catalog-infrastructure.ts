import { Product } from "@prisma/client";
import { CreateProduct } from "./create-product";

export interface CatalogInfrastructure {
  getProducts(): Promise<Product[]>;
  createProduct(product: CreateProduct): Promise<Product>;
}
