import { OrderedProducts, Prisma } from "@prisma/client";

export interface IOrderedProductsRepository {
  create(data: Prisma.OrderedProductsCreateInput): Promise<OrderedProducts>;
}
