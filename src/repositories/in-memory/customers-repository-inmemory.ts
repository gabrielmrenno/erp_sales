import { ICreateCustomerDTO, IUpdateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { ICustomersRepository } from "../customers-repository-interface";

export class CustomersRepositoryInMemory implements ICustomersRepository {
  customers: Customer[] = [];
  async create(data: ICreateCustomerDTO): Promise<Customer> {
    const newCustomer = new Customer(data);
    await this.customers.push(newCustomer);

    return newCustomer;
  }

  async findById(id: string): Promise<Customer | null> {
    const user = await this.customers.find((customer) => customer.id === id);

    return user || null;
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

  async update(newCustomerData: IUpdateCustomerDTO): Promise<Customer> {
    const updatedCustomer = await this.findById(newCustomerData.id);
    const index = this.customers.findIndex(
      (customer) => customer.id === newCustomerData.id
    );

    Object.assign(updatedCustomer!, newCustomerData);

    this.customers[index] = updatedCustomer!;

    return updatedCustomer!;
  }
}
