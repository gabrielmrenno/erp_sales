import { Request, Response } from "express";
import { AppError } from "../../../errors/app-error";
import { OrdersRepository } from "../../../repositories/implementations/orders-respository";
import { GetOrderUseCase } from "../../../useCases/order/get-order";

export async function getOrder(
  request: Request,
  response: Response
): Promise<Response> {
  const ordersRepository = new OrdersRepository();

  const getOrderUseCase = new GetOrderUseCase(ordersRepository);

  const { code } = request.params;

  if (!code) {
    throw new AppError("Invalid order id", 400);
  }

  const codeNumber = Number(code);

  const customer = await getOrderUseCase.execute({ code: codeNumber });

  return response.json(customer);
}
