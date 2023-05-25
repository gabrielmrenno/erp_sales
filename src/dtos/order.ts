import { Customer, Order, OrderedProducts, User } from "@prisma/client";

export interface ICreateOrder {
  id?: number;

  items: string[];
  totalValue: number;
  totalWeight: number;
  dueDate: Date;

  deliveryDate: Date;
  customerId: string;
  userId: string;
  paymentStatus: string;
  paymentDate: string;
}

export interface InOrder extends Order {
  orderedProducts: OrderedProducts[];
}

export interface IFullOrder extends Order {
  OrderedProducts: OrderedProducts[];
  customer: Customer;
  user: User;
}

export interface IOrderWithProductsAndCustomer extends Order {
  OrderedProducts: OrderedProducts[];
  customer: Customer;
}
