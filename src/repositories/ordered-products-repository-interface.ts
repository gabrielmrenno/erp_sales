import { OrderedProducts, Prisma } from "@prisma/client";

export interface IOrderedProductsRepository {
  create(data: OrderedProducts[]): Promise<void>;

  getProductsByOrderId(id: number): Promise<OrderedProducts[]>;

  deleteMany(orderId: number): Promise<void>;
}
