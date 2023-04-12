import { randomUUID } from "crypto";
import { ICreateCustomerDTO } from "../dtos/customer";

export class Customer {
  code?: number;
  name: string;
  fantasyName: string;
  doc: string;
  email: string;
  phone: string;
  contactName: string;
  address: string;
  city: string;
  zipCode: string;
  discount: number;
  paymentTerm: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(props: ICreateCustomerDTO) {
    this.code = props.code;
    this.name = props.name;
    this.fantasyName = props.fantasyName;
    this.doc = props.doc;
    this.email = props.email;
    this.phone = props.phone;
    this.contactName = props.contactName;
    this.address = props.address;
    this.city = props.city;
    this.zipCode = props.zipCode;
    this.discount = props.discount;
    this.paymentTerm = props.paymentTerm;
    this.active = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
  }
}
