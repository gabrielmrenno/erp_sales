import { Request, Response } from "express";
import { OrdersRepository } from "../../../repositories/implementations/orders-respository";
import { CustomersRepository } from "../../../repositories/implementations/customers-repository";
import { UsersRepository } from "../../../repositories/implementations/users-repository";
import { CreateOrderUseCase } from "../../../useCases/order/create-order";
import { OrderedProducts } from "@prisma/client";
import { OrderedProductsRepository } from "../../../repositories/implementations/ordered-products-repository";
import { ProductsInfoRepository } from "../../../repositories/implementations/products-info-repository";

interface CreateOrderedProducts {
  amount: number;
  productInfoCode: number;
}

interface CreateOrderUseCaseRequest {
  items: CreateOrderedProducts[];
  customerCode: number;
  userId: string;
}

export async function createOrder(request: Request, response: Response) {
  const ordersRepository = new OrdersRepository();
  const customersRepository = new CustomersRepository();
  const usersRepository = new UsersRepository();
  const orderedProductsRepository = new OrderedProductsRepository();
  const productsInfoRepository = new ProductsInfoRepository();

  const createOrderUseCase = new CreateOrderUseCase(
    ordersRepository,
    customersRepository,
    usersRepository,
    productsInfoRepository,
    orderedProductsRepository
  );

  const { customerCode, items, userId }: CreateOrderUseCaseRequest =
    request.body;

  const responseData = await createOrderUseCase.execute({
    customerCode,
    items,
    userId,
  });

  return response.status(201).json({
    message: "Order created successfully",
    data: {
      id: responseData.order.id,
    },
  });
}
