import { Customer, Order, OrderedProducts, Prisma, User } from "@prisma/client";

interface ICreateOrderParams {
  customerCode: number;
  userId: string;
  paymentStatus: string;
  active: boolean;
}

export interface IFetchAllOrderParams {
  page?: number;
  initialInterval?: Date;
  finalInterval?: Date;
  code?: number;
}

export interface InOrder extends Order {
  OrderedProducts: OrderedProducts[];
  customer: Customer;
}

export interface GetOrderResponse extends InOrder {
  user: User;
}

export interface IOrdersRepository {
  create(newOrderData: ICreateOrderParams): Promise<Order>;

  fetchAll(data: IFetchAllOrderParams): Promise<InOrder[]>;
  getById(id: number): Promise<GetOrderResponse | null>;

  update(updatedOrder: Prisma.OrderUncheckedUpdateInput): Promise<void>;

  delete(id: number): Promise<void>;
}
