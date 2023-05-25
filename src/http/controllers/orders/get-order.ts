import { Request, Response } from "express";
import { OrdersRepository } from "../../../repositories/implementations/orders-respository";
import { GetOrderUseCase } from "../../../useCases/order/get-order";
import { OrderedProductsRepository } from "../../../repositories/implementations/ordered-products-repository";
import { ProductsInfoRepository } from "../../../repositories/implementations/products-info-repository";
import { AppError } from "../../../errors/app-error";

export async function getOrder(
  request: Request,
  response: Response
): Promise<Response> {
  const ordersRepository = new OrdersRepository();
  const orderedProductsInfoRepository = new OrderedProductsRepository();
  const productsInfoRepository = new ProductsInfoRepository();
  const getOrderUseCase = new GetOrderUseCase(
    ordersRepository,
    orderedProductsInfoRepository,
    productsInfoRepository
  );

  const { code } = request.params;

  if (!code) {
    throw new AppError("Invalid order id", 400);
  }

  const codeNumber = Number(code);

  const customer = await getOrderUseCase.execute({ code: codeNumber });

  return response.json(customer);
}
