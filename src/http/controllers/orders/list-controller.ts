import { Request, Response } from "express";
import { OrdersRepository } from "../../../repositories/implementations/orders-respository";
import { FetchOrdersUseCase } from "../../../useCases/order/fetch-orders";

export async function listOrders(
  request: Request,
  response: Response
): Promise<Response> {
  const ordersRepository = new OrdersRepository();
  const fetchOrdersUseCase = new FetchOrdersUseCase(ordersRepository);

  const { code, page, initialInterval, finalInterval } = request.query;

  const finalIntervalFormatted = finalInterval?.toString();
  const initialIntervalFormatted = initialInterval?.toString();
  let codeFormatted: number | undefined;

  if (code) {
    if (isNaN(Number(code))) {
      codeFormatted = undefined;
    }
    codeFormatted = Number(code);
  } else {
    codeFormatted = undefined;
  }

  const customers = await fetchOrdersUseCase.execute({
    code: codeFormatted,
    finalInterval: finalIntervalFormatted
      ? new Date(finalIntervalFormatted)
      : undefined,
    initialInterval: initialIntervalFormatted
      ? new Date(initialIntervalFormatted)
      : undefined,
    page: Number(page) | 1,
  });

  return response.json(customers);
}
