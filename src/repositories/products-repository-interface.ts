import { Prisma, Product } from "@prisma/client";

interface GetProduct {
  productBatch: string;
  productInfoCode: number;
}

export interface ProductsRepository {
  create(data: Prisma.ProductCreateManyInput): Promise<Product>;

  get(data: GetProduct): Promise<Product | null>;

  // update amount of stock
  updateAmount(data: Prisma.ProductUncheckedUpdateManyInput): Promise<void>;
}
