import { Order } from "@prisma/client";
import { Request, Response } from "express";
import { AppError } from "../../../errors/app-error";
import { MissingProductsRepository } from "../../../repositories/implementations/missing-products-repository";
import { OrderedProductsRepository } from "../../../repositories/implementations/ordered-products-repository";
import { OrdersRepository } from "../../../repositories/implementations/orders-respository";
import { UpdateOrderUseCase } from "../../../useCases/order/update-order";

interface UpdateOrderedProducts {
  amount: number;
  productInfoCode: number;
}

interface UpdateOrderRequest extends Order {
  items: UpdateOrderedProducts[];
}

export async function updateOrder(request: Request, response: Response) {
  const ordersRepository = new OrdersRepository();
  const orderedProductsRepository = new OrderedProductsRepository();
  const missingProductsRepository = new MissingProductsRepository();

  const createOrderUseCase = new UpdateOrderUseCase(
    ordersRepository,
    orderedProductsRepository,
    missingProductsRepository
  );

  const {
    customerCode,
    deliveryDate,
    paymentDate,
    paymentStatus,
    userId,
    items,
  }: UpdateOrderRequest = request.body;

  const { id } = request.params;

  const orderId = Number(id);

  if (isNaN(orderId)) {
    throw new AppError("Invalid order id");
  }

  await createOrderUseCase.execute({
    orderId,
    customerCode,
    deliveryDate,
    paymentDate,
    paymentStatus,
    userId,
    items,
  });

  return response.status(204).json({
    message: "Order updated successfully",
    data: {},
  });
}
