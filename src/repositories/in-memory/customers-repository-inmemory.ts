import { ICreateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { ICustomersRepository } from "../customers-repository-interface";

export class CustomersRepositoryInMemory implements ICustomersRepository {
  customers: Customer[] = [];
  async create(data: ICreateCustomerDTO): Promise<Customer> {
    const newCustomer = new Customer(data);
    await this.customers.push(newCustomer);

    return newCustomer;
  }
}
