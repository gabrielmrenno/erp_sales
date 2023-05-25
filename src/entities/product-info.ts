export class ProductInfo {
  code?: number;
  name: string;
  description: string;
  group: string;
  unit: "FD" | "SC";
  price: number;
  weight: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(data: ICreateProductInfo) {
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.group = data.group;
    this.unit = data.unit;
    this.price = data.price;
    this.weight = data.weight;
    this.active = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
  }
}
