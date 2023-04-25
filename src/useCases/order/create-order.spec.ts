import { beforeEach, describe, expect, it } from "vitest";
import { IOrdersRepository } from "../../repositories/orders-repository-interface";
import { CreateOrderUseCase } from "./create-order";
import { OrdersRepositoryInMemory } from "../../repositories/in-memory/orders-repository-inmemory";
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/customers-repository-inmemory";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";
import { IUsersRepository } from "../../repositories/users-repository-interface";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/users-repository-inmemory";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { User } from "../../entities/user";
import { hash } from "bcrypt";
import { IOrderedProductsRepository } from "../../repositories/ordered-products-repository-interface";
import { OrderedProductsRepositoryInMemory } from "../../repositories/in-memory/ordered-products-repository-inmemory";
import { Prisma } from "@prisma/client";

let ordersRepository: IOrdersRepository;
let customersRepository: ICustomersRepository;
let usersRepository: IUsersRepository;
let orderedProductsRepository: IOrderedProductsRepository;
let sut: CreateOrderUseCase;

describe("Create order use case", () => {
  beforeEach(() => {
    ordersRepository = new OrdersRepositoryInMemory();
    customersRepository = new CustomersRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();
    orderedProductsRepository = new OrderedProductsRepositoryInMemory();
    sut = new CreateOrderUseCase(
      ordersRepository,
      customersRepository,
      usersRepository,
      orderedProductsRepository
    );
  });
  it("should be able to create an order", async () => {
    let productInfoRepository = new ProductsRepositoryInMemory();

    const product = await productInfoRepository.create({
      code: 1,
      name: "Produto teste",
      description: "Descição teste",
      group: "Grupo teste",
      price: 10,
      unit: "FD",
      weight: 10,
    });

    const customer = await customersRepository.create({
      name: "Customer 1",
      email: "test@email.com",
      phone: "123456789",
      address: "Test Address",
      city: "Test City",
      zipCode: "123456",
      contactName: "Test Contact Name",
      discount: 0,
      paymentTerm: 0,
      doc: "132456789",
      fantasyName: "Test Fantasy Name",
      code: 1,
    });

    const newUser = new User({
      name: "John Doe",
      username: "johndoe",
      role: "admin",
      isAdmin: "ADMIN" ? true : false,
      password: await hash("mudar@123", 8),
    });

    const user = await usersRepository.save(newUser);

    const { order } = await sut.execute({
      items: [
        {
          amount: 5,
          productInfoCode: product.code!,
          totalValue: new Prisma.Decimal(500),
        },
      ],
      customerCode: customer.code!,
      userId: user.id,
    });

    expect(order.id).toEqual(expect.any(Number));
    expect(order.userId).toEqual(expect.any(String));
  });
});
