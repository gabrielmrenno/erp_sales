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
    const order: Order = {
      id: Math.random(),
      userId: newOrderData.userId,
      active: true,
      customerCode: newOrderData.customerCode,
      deliveryDate: new Date(),
      paymentStatus: newOrderData.paymentStatus,
      paymentDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    this.items.push(order);

    return order;
  }
}
