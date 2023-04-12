import { prisma } from "../../database/prisma-client";
import {
  ICreateCustomerDTO,
  ListCustomersParams,
  IUpdateCustomerDTO,
} from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { ICustomersRepository } from "../customers-repository-interface";

export class CustomersRepository implements ICustomersRepository {
  async create(data: ICreateCustomerDTO): Promise<Customer> {
    const newCustomer = new Customer(data);
    const user = await prisma.customer.create({ data: newCustomer });
    return user;
  }

  async findByName(name: string): Promise<Customer | null> {
    const user = await prisma.customer.findUnique({
      where: {
        name,
      },
    });

    return user;
  }
  async findByFantasyName(fantasyName: string): Promise<Customer | null> {
    const user = await prisma.customer.findUnique({
      where: {
        fantasyName,
      },
    });

    return user;
  }
  async findByDoc(doc: string): Promise<Customer | null> {
    const user = await prisma.customer.findUnique({
      where: {
        doc,
      },
    });

    return user;
  }
  async findByCode(code: number): Promise<Customer | null> {
    const user = await prisma.customer.findUnique({
      where: {
        code,
      },
    });

    return user;
  }
  async list({
    active = true,
    page = 1,
    stringQuery,
    numberQuery,
  }: ListCustomersParams): Promise<Customer[]> {
    const customers = await prisma.customer.findMany({
      where: {
        active,
        fantasyName: {
          contains: stringQuery,
        },
        doc: {
          contains: stringQuery,
        },
        code: {
          equals: numberQuery,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return customers;
  }
  async update(newCustomerData: IUpdateCustomerDTO): Promise<Customer> {
    const updatedCustomer = await prisma.customer.update({
      where: {
        code: newCustomerData.code,
      },
      data: newCustomerData,
    });

    return updatedCustomer;
  }
  async delete(code: number): Promise<void> {
    await prisma.customer.update({
      where: {
        code,
      },
      data: {
        deletedAt: new Date(),
        active: false,
      },
    });
  }
}
