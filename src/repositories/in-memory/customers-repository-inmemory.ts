import {
  ICreateCustomerDTO,
  IUpdateCustomerDTO,
  ListCustomersParams,
} from "../../dtos/customer";
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

  async list({
    active = true,
    page = 1,
    stringQuery,
    numberQuery,
  }: ListCustomersParams): Promise<Customer[]> {
    let customersList = this.customers.filter((item) => item.active === active);

    if (stringQuery) {
      customersList = customersList.filter(
        (item) =>
          item.fantasyName.includes(stringQuery) ||
          item.doc.includes(stringQuery)
      );
    }

    if (numberQuery) {
      customersList = customersList.filter((item) => item.code === numberQuery);
    }

    return customersList.slice((page - 1) * 20, page * 20);
  }

  async update(newCustomerData: IUpdateCustomerDTO): Promise<Customer> {
    const updatedCustomer = await this.findByCode(newCustomerData.code);
    const index = this.customers.findIndex(
      (customer) => customer.code === newCustomerData.code
    );

    Object.assign(updatedCustomer!, newCustomerData);

    this.customers[index] = updatedCustomer!;

    return updatedCustomer!;
  }

  async delete(code: number): Promise<void> {
    const customerToBeDeletedIndex = this.customers.findIndex(
      (customer) => customer.code === code
    );

    this.customers.splice(customerToBeDeletedIndex, 1);
  }
}
