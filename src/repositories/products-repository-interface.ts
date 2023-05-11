import { Prisma, Product } from "@prisma/client";

interface GetProduct {
  productBatch: string;
  productInfoCode: number;
}

interface UpdateProduct {
  id: string;
  amount: number;
}

export interface IProductsRepository {
  create(data: Prisma.ProductCreateManyInput): Promise<Product>;

  get(data: GetProduct): Promise<Product | null>;

  // update amount of stock
  updateAmount(data: UpdateProduct): Promise<void>;
}
