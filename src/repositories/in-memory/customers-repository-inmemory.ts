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

  async findByName(name: string): Promise<Customer | null> {
    const user = await this.customers.find(
      (customer) => customer.name === name
    );

    return user || null;
  }

  async findByFantasyName(fantasyName: string): Promise<Customer | null> {
    const user = await this.customers.find(
      (customer) => customer.fantasyName === fantasyName
    );

    return user || null;
  }

  async findByDoc(doc: string): Promise<Customer | null> {
    const user = await this.customers.find((customer) => customer.doc === doc);

    return user || null;
  }

  async findByCode(code: number): Promise<Customer | null> {
    const user = await this.customers.find(
      (customer) => customer.code === code
    );

    return user || null;
  }

  async listAvailable(): Promise<Customer[]> {
    return this.customers;
  }
}
