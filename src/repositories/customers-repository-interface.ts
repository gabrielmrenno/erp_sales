import { ICreateCustomerDTO } from "../dtos/customer";
import { Customer } from "../entities/customer";

export interface ICustomersRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
}
