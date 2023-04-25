import { Order, Prisma } from "@prisma/client";

interface ICreateOrderParams {
  customerCode: number;
  userId: string;
  paymentStatus: string;
  active: boolean;
}

export interface IOrdersRepository {
  create(newOrderData: ICreateOrderParams): Promise<Order>;
}
