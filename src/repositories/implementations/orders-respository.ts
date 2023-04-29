import { Order, OrderedProducts, User } from "@prisma/client";
import {
  GetOrderResponse,
  IFetchAllOrderParams,
  IOrdersRepository,
  InOrder,
} from "../orders-repository-interface";
import { prisma } from "../../database/prisma-client";
interface ICreateOrderParams {
  customerCode: number;
  userId: string;
  paymentStatus: string;
  active: boolean;
}

export class OrdersRepository implements IOrdersRepository {
  async create(newOrderData: ICreateOrderParams): Promise<Order> {
    const newOrder = await prisma.order.create({
      data: {
        active: true,
        paymentStatus: "pendent",
        customer: {
          connect: {
            code: newOrderData.customerCode,
          },
        },
        user: {
          connect: {
            id: newOrderData.userId,
          },
        },
      },
      include: {
        OrderedProducts: true,
      },
    });

    return newOrder;
  }

  async fetchAll({
    page = 1,
    code,
    initialInterval,
    finalInterval,
  }: IFetchAllOrderParams): Promise<InOrder[]> {
    const orders = await prisma.order.findMany({
      where: {
        id: {
          equals: code,
        },
        createdAt: {
          gte: initialInterval,
          lte: finalInterval,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
      include: {
        OrderedProducts: true,
        customer: true,
      },
    });

    const ordersToBeReturn: InOrder[] = orders.map((order) => ({
      ...order,
    }));

    return ordersToBeReturn;
  }

  async getById(id: number): Promise<GetOrderResponse | null> {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderedProducts: true,
        customer: true,
        user: true,
      },
    });

    return order;
  }

  async update(updatedOrder: Order): Promise<void> {
    await prisma.order.update({
      where: {
        id: updatedOrder.id,
      },
      data: updatedOrder,
    });
  }

  async delete(id: number): Promise<void> {
    console.log(id);

    await prisma.order.delete({
      where: {
        id,
      },
    });
  }
}
