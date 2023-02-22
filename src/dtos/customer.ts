export interface ICreateCustomerDTO {
  name: string;
  code?: number;
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
}

export interface IUpdateCustomerDTO {
  id: string;
  name: string;
  fantasyName: string;
  doc: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  email: string;
  contactName: string;
  discount: number;
  paymentTerm: number;
}
