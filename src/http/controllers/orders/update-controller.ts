import { Request, Response } from "express";
import { OrdersRepository } from "../../../repositories/implementations/orders-respository";
import { Order } from "@prisma/client";
import { AppError } from "../../../errors/app-error";
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

  const createOrderUseCase = new UpdateOrderUseCase(ordersRepository);

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

  console.log(id);

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
