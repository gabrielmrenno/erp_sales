import { OrderedProducts, Prisma } from "@prisma/client";

export interface IOrderedProductsRepository {
  create(data: Prisma.OrderedProductsUncheckedCreateInput[]): Promise<void>;

  getProductsByOrderId(id: number): Promise<OrderedProducts[]>;
}
