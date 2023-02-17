import { randomUUID } from "node:crypto";

export class PackageProduct {
  id: string;
  description: string;
  batch: string;
  idProduct: string;
  idProductionLaunch: string;
  unit: "FD" | "SC";
  price: number;
  weight: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(props: ICreatePackageProduct) {
    this.id = randomUUID();
    this.description = props.description;
    this.batch = props.batch;
    this.idProduct = props.idProduct;
    this.idProductionLaunch = props.idProductionLaunch;
    this.unit = props.unit;
    this.price = props.price;
    this.weight = props.weight;
    this.active = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
  }
}
