export interface ICreateCustomerDTO {
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
}

export interface IUpdateCustomerDTO {
  code: number;
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

export interface ListCustomersParams {
  active?: boolean;
  page?: number;
  stringQuery?: string;
  numberQuery?: number;
}
