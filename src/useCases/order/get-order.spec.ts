import { beforeAll, describe, expect, it } from "vitest";
import { AppError } from "../../errors/app-error";
import { OrdersRepositoryInMemory } from "../../repositories/in-memory/orders-repository-inmemory";
import { GetOrderUseCase } from "./get-order";
import { createProducts, createUsers } from "../utils/test-utils";
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/customers-repository-inmemory";
import { Prisma } from "@prisma/client";
import { OrderedProductsRepositoryInMemory } from "../../repositories/in-memory/ordered-products-repository-inmemory";
import { CreateOrderUseCase } from "./create-order";

let ordersRepositoryInMemory: OrdersRepositoryInMemory;
let orderedProductsRepositoryInMemory: OrderedProductsRepositoryInMemory;
let sut: GetOrderUseCase;

describe("List customer by code", () => {
  beforeAll(async () => {
    ordersRepositoryInMemory = new OrdersRepositoryInMemory();
    orderedProductsRepositoryInMemory = new OrderedProductsRepositoryInMemory();
    sut = new GetOrderUseCase(
      ordersRepositoryInMemory,
      orderedProductsRepositoryInMemory
    );
  });
  it("should be able to list order by id", async () => {
    const products = await createProducts(2);

    const customersRepository = new CustomersRepositoryInMemory();

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

    const newOrder = await ordersRepositoryInMemory.create({
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

    await orderedProductsRepositoryInMemory.create([
      {
        amount: 5,
        productInfoCode: products[0].code,
        totalValue: new Prisma.Decimal(500),
        orderId: newOrder.id,
      },
      {
        amount: 10,
        productInfoCode: products[1].code,
        totalValue: new Prisma.Decimal(1000),
        orderId: newOrder.id,
      },
    ]);

    const { orderWithProducts } = await sut.execute({ code: newOrder.id });

    expect(orderWithProducts.id).toEqual(newOrder.id);
    expect(orderWithProducts.items).toHaveLength(2);
  });

  it("should not be able to list order by id if id doesn't exist", async () => {
    expect(async () => {
      await sut.execute({ code: 0 });
    }).rejects.toEqual(new AppError("Order not found", 404));
  });
});
