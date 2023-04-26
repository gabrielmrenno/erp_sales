import { beforeAll, describe, expect, it } from "vitest";
import { AppError } from "../../errors/app-error";
import { OrdersRepositoryInMemory } from "../../repositories/in-memory/orders-repository-inmemory";
import { GetOrderUseCase } from "./get-order";
import { createProducts, createUsers } from "../utils/test-utils";
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/customers-repository-inmemory";
import { Prisma } from "@prisma/client";
import { OrderedProductsRepositoryInMemory } from "../../repositories/in-memory/ordered-products-repository-inmemory";
import { IOrdersRepository } from "../../repositories/orders-repository-interface";
import { IOrderedProductsRepository } from "../../repositories/ordered-products-repository-interface";
import { IProductsInfoRepository } from "../../repositories/product-repository-interface";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";

let ordersRepositoryInMemory: IOrdersRepository;
let orderedProductsRepositoryInMemory: IOrderedProductsRepository;
let productsInfoRepositoryInMemory: IProductsInfoRepository;

let sut: GetOrderUseCase;

describe("List customer by code", () => {
  beforeAll(async () => {
    ordersRepositoryInMemory = new OrdersRepositoryInMemory();
    orderedProductsRepositoryInMemory = new OrderedProductsRepositoryInMemory();
    productsInfoRepositoryInMemory = new ProductsRepositoryInMemory();
    sut = new GetOrderUseCase(
      ordersRepositoryInMemory,
      orderedProductsRepositoryInMemory,
      productsInfoRepositoryInMemory
    );
  });
  it("should be able to list order by id", async () => {
    const product1 = await productsInfoRepositoryInMemory.create({
      code: 1,
      name: `Produto teste 1`,
      description: `Descição teste 1`,
      group: `Grupo teste 1`,
      price: 10,
      unit: "FD",
      weight: 10,
    });

    const product2 = await productsInfoRepositoryInMemory.create({
      code: 2,
      name: `Produto teste 2`,
      description: `Descição teste 2`,
      group: `Grupo teste 2`,
      price: 20,
      unit: "FD",
      weight: 20,
    });

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
    });

    await ordersRepositoryInMemory.create({
      active: true,
      customerCode: customer.code!,
      paymentStatus: "pendent",
      userId: newUser[0].id,
    });

    await orderedProductsRepositoryInMemory.create([
      {
        amount: 5,
        productInfoCode: product1.code,
        productPrice: product1.price,
        productWeight: product1.weight,
        orderId: newOrder.id,
      },
      {
        amount: 10,
        productInfoCode: product2.code,
        productPrice: product2.price,
        productWeight: product2.weight,
        orderId: newOrder.id,
      },
    ]);

    const { orderWithProducts, totalValue, totalWeight } = await sut.execute({
      code: newOrder.id,
    });

    expect(orderWithProducts.id).toEqual(newOrder.id);
    expect(orderWithProducts.items).toHaveLength(2);
    expect(totalValue).toEqual(250);
  });

  it("should not be able to list order by id if id doesn't exist", async () => {
    expect(async () => {
      await sut.execute({ code: 0 });
    }).rejects.toEqual(new AppError("Order not found", 404));
  });
});
