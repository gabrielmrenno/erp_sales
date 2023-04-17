import { Order, OrderedProducts } from "@prisma/client";
import { IOrdersRepository } from "../orders-repository-interface";

type CreateOrderOrderedProducts = Omit<OrderedProducts, "orderId">;

interface ICreateOrderParams {
  items: CreateOrderOrderedProducts[];
  customerCode: number;
  userId: string;
  paymentStatus: string;
  active: boolean;
}

export class OrdersRepositoryInMemory implements IOrdersRepository {
  items: Order[] = [];

  async create(newOrderData: ICreateOrderParams): Promise<Order> {
    throw new Error("Method not implemented.");
  }
}
