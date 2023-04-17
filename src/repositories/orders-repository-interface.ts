import { Order, OrderedProducts, Prisma } from "@prisma/client";

type CreateOrderOrderedProducts = Omit<OrderedProducts, "orderId">;

interface ICreateOrderParams {
  items: CreateOrderOrderedProducts[];
  customerCode: number;
  userId: string;
  paymentStatus: string;
  active: boolean;
}

export interface IOrdersRepository {
  create(newOrderData: ICreateOrderParams): Promise<Order>;
}
