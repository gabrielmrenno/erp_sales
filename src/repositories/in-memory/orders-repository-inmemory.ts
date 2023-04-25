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

interface IFetchAllOrderParams {
  page?: number;
  initialInterval?: Date;
  finalInterval?: Date;
  code?: number;
}

export class OrdersRepositoryInMemory implements IOrdersRepository {
  items: Order[] = [];

  async create(newOrderData: ICreateOrderParams): Promise<Order> {
    const order: Order = {
      id: Math.trunc(Math.random() * 100),
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

  async fetchAll({
    page = 1,
    initialInterval,
    finalInterval = new Date(),
    code,
  }: IFetchAllOrderParams): Promise<Order[]> {
    let filteredItems = this.items.slice((page - 1) * 20, page * 20);

    if (initialInterval) {
      filteredItems = this.items.filter(
        (item) =>
          item.createdAt >= initialInterval && item.createdAt <= finalInterval
      );
    }

    if (code) {
      filteredItems = this.items.filter((item) =>
        item.id.toString().includes(code.toString())
      );
    }

    return filteredItems;
  }
}
