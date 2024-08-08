import { Product } from "@prisma/client";
import { CreateProduct } from "./create-product";

export interface CatalogRepository {
  getProducts(): Promise<Product[]>;
  createProduct(product: CreateProduct): Promise<Product>;
}
