import { randomUUID } from "crypto";

export class Product {
  id: string;
  name: string;
  group: string;
  unitPrice: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(data: ICreateProduct) {
    this.id = randomUUID();
    this.name = data.name;
    this.group = data.group;
    this.unitPrice = data.unitPrice;
    this.active = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
  }
}
