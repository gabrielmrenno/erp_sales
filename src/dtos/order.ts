interface ICreateOrder {
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
