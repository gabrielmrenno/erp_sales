export class Order {
  id?: number;

  items: string[];
  totalValue: number;
  totalWeight: number;

  deliveryDate?: Date;
  customerId: string;
  userId: string;
  dueDate?: Date;
  paymentStatus: string;
  paymentDate: string;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(data: ICreateOrder) {
    this.id = data.id;

    this.items = data.items;
    this.totalValue = data.totalValue;
    this.totalWeight = data.totalWeight;

    this.deliveryDate = data.deliveryDate;
    this.customerId = data.customerId;
    this.userId = data.userId;
    this.dueDate = data.dueDate;
    this.paymentStatus = data.paymentStatus;
    this.paymentDate = data.paymentDate;

    this.active = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
  }
}
