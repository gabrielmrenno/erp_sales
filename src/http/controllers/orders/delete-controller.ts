import { Request, Response } from "express";
import { OrdersRepository } from "../../../repositories/implementations/orders-respository";
import { OrderedProductsRepository } from "../../../repositories/implementations/ordered-products-repository";
import { AppError } from "../../../errors/app-error";
import { DeleteOrderUseCase } from "../../../useCases/order/delete-order";

export async function deleteOrder(
  request: Request,
  response: Response
): Promise<Response> {
  const ordersRepository = new OrdersRepository();
  const orderedProductsInfoRepository = new OrderedProductsRepository();
  const deleteOrderUseCase = new DeleteOrderUseCase(
    ordersRepository,
    orderedProductsInfoRepository
  );

  const { code } = request.params;

  if (!code) {
    throw new AppError("Invalid order id", 400);
  }

  const codeNumber = Number(code);

  if (isNaN(codeNumber)) {
    throw new AppError("Invalid order id");
  }

  await deleteOrderUseCase.execute({ code: codeNumber });

  return response.status(204).json({
    message: "Order deleted successfully",
    data: {},
  });
}
