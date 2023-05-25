import { OrderedProducts, Prisma } from "@prisma/client";

export interface IPutProductsOnOrderParams {
  orderId: number;
  productId: string;
  amount: number;
}

export interface IOrderedProductsRepository {
  create(data: OrderedProducts): Promise<void>;
  createMany(data: OrderedProducts[]): Promise<void>;

  getProductsByOrderId(id: number): Promise<OrderedProducts[]>;

  putProductsOnOrder(data: IPutProductsOnOrderParams): Promise<void>;

  deleteMany(orderId: number): Promise<void>;
}
