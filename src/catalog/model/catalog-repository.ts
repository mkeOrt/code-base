import { Product } from "@prisma/client";
import { CreateProduct } from "./dto";

export interface CatalogRepository {
  getProducts(): Promise<Product[]>;
  createProduct(product: CreateProduct): Promise<Product>;
}
