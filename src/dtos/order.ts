interface ICreateOrder {
  id: number;

  items: string[];
  totalValue: number;
  totalWeight: number;

  deliveryDate: Date;
  customerId: string;
  userId: string;
  paymentStatus: string;
  paymentDate: string;
}
