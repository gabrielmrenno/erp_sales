import { Order } from "@prisma/client";

interface ICreateOrderParams {
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

export interface IOrdersRepository {
  create(newOrderData: ICreateOrderParams): Promise<Order>;

  fetchAll(data: IFetchAllOrderParams): Promise<Order[]>;
  getById(id: number): Promise<Order | null>;
}
