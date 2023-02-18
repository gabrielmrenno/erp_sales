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
