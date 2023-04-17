import { Order, OrderedProducts } from "@prisma/client";
import { IOrdersRepository } from "../orders-repository-interface";
import { prisma } from "../../database/prisma-client";

type CreateOrderOrderedProducts = Omit<OrderedProducts, "orderId">;

interface ICreateOrderParams {
  items: CreateOrderOrderedProducts[];
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
        OrderedProducts: {
          createMany: {
            data: newOrderData.items,
          },
        },
      },
    });

    return newOrder;
  }
}
