import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { OrdersRepositoryInMemory } from "../../repositories/in-memory/orders-repository-inmemory";
import { FetchOrdersUseCase } from "./fetch-orders";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";
import { Prisma } from "@prisma/client";
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/customers-repository-inmemory";
import { createProducts, createUsers } from "../../utils/test-utils";

let ordersRepositoryInMemory: OrdersRepositoryInMemory;
let customersRepository: ICustomersRepository;
let sut: FetchOrdersUseCase;

describe("Fetch orders use case", () => {
  beforeEach(() => {
    ordersRepositoryInMemory = new OrdersRepositoryInMemory();
    customersRepository = new CustomersRepositoryInMemory();
    sut = new FetchOrdersUseCase(ordersRepositoryInMemory);

    // to mock date
    vi.useFakeTimers();
  });

  afterEach(() => {
    // returning to original state
    vi.useRealTimers();
  });

  it("should be able to list orders", async () => {
    const products = await createProducts(2);

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

    const newUser = await createUsers(1);

    await ordersRepositoryInMemory.create({
      active: true,
      customerCode: customer.code!,
      paymentStatus: "pendent",
      userId: newUser[0].id,
      items: [
        {
          amount: 5,
          productInfoCode: products[0].code!,
          totalValue: new Prisma.Decimal(500),
        },
        {
          amount: 10,
          productInfoCode: products[1].code!,
          totalValue: new Prisma.Decimal(1000),
        },
      ],
    });

    await ordersRepositoryInMemory.create({
      active: true,
      customerCode: customer.code!,
      paymentStatus: "pendent",
      userId: newUser[0].id,
      items: [
        {
          amount: 5,
          productInfoCode: products[0].code,
          totalValue: new Prisma.Decimal(500),
        },
        {
          amount: 10,
          productInfoCode: products[1].code,
          totalValue: new Prisma.Decimal(1000),
        },
      ],
    });

    const { orders } = await sut.execute({});

    expect(orders).toHaveLength(2);
    expect(orders).toEqual([
      expect.objectContaining({ userId: newUser[0].id }),
      expect.objectContaining({ userId: newUser[0].id }),
    ]);
  });

  it("should be able to paginate orders's list", async () => {
    const products = await createProducts(2);

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

    const users = await createUsers(1);

    for (let i = 1; i <= 22; i++) {
      await ordersRepositoryInMemory.create({
        active: true,
        customerCode: customer.code!,
        paymentStatus: "pendent",
        userId: users[0].id,
        items: [
          {
            amount: i,
            productInfoCode: products[0].code,
            totalValue: new Prisma.Decimal(i * 100),
          },
        ],
      });
    }

    const { orders } = await sut.execute({
      page: 2,
    });

    expect(orders).toHaveLength(2);
    expect(orders).toEqual([
      expect.objectContaining({ customerCode: customer.code }),
      expect.objectContaining({ customerCode: customer.code }),
    ]);
  });

  it("should be able to filter order's createdAt interval", async () => {
    const products = await createProducts(2);

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

    const users = await createUsers(1);

    vi.setSystemTime(new Date(2023, 3, 21, 0, 0));

    await ordersRepositoryInMemory.create({
      active: true,
      customerCode: customer.code!,
      paymentStatus: "pendent",
      userId: users[0].id,
      items: [
        {
          amount: 5,
          productInfoCode: products[0].code,
          totalValue: new Prisma.Decimal(500),
        },
        {
          amount: 10,
          productInfoCode: products[1].code,
          totalValue: new Prisma.Decimal(1000),
        },
      ],
    });

    vi.setSystemTime(new Date(2023, 3, 25, 0, 0));

    await ordersRepositoryInMemory.create({
      active: true,
      customerCode: customer.code!,
      paymentStatus: "pendent",
      userId: users[0].id,
      items: [
        {
          amount: 5,
          productInfoCode: products[0].code,
          totalValue: new Prisma.Decimal(500),
        },
        {
          amount: 10,
          productInfoCode: products[1].code,
          totalValue: new Prisma.Decimal(1000),
        },
      ],
    });

    const initialInterval = new Date("2023-04-20");
    const finalInterval = new Date("2023-04-23");

    const { orders } = await sut.execute({
      page: 2,
      finalInterval,
      initialInterval,
    });

    expect(orders).toHaveLength(1);
  });

  it("should be able to filter order's list by code", async () => {
    const products = await createProducts(2);

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

    const users = await createUsers(1);

    for (let i = 1; i <= 22; i++) {
      await ordersRepositoryInMemory.create({
        active: true,
        customerCode: customer.code!,
        paymentStatus: "pendent",
        userId: users[0].id,
        items: [
          {
            amount: i,
            productInfoCode: products[0].code,
            totalValue: new Prisma.Decimal(i * 100),
          },
        ],
      });
    }

    const { orders } = await sut.execute({
      code: 2,
    });

    // expect(orders).toEqual([expect.objectContaining({ code: 2 })]);
  });
});
