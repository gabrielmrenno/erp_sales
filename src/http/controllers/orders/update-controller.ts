import { Request, Response } from "express";
import { OrdersRepository } from "../../../repositories/implementations/orders-respository";
import { Order, OrderedProducts } from "@prisma/client";
import { OrderedProductsRepository } from "../../../repositories/implementations/ordered-products-repository";
import { AppError } from "../../../errors/app-error";
import { UpdateOrderUseCase } from "../../../useCases/order/update-order";

interface UpdateOrderRequest extends Order {
  OrderedProducts: OrderedProducts[];
}

export async function updateOrder(request: Request, response: Response) {
  const ordersRepository = new OrdersRepository();
  const orderedProductsRepository = new OrderedProductsRepository();

  const createOrderUseCase = new UpdateOrderUseCase(
    ordersRepository,
    orderedProductsRepository
  );

  const {
    customerCode,
    deliveryDate,
    paymentDate,
    paymentStatus,
    userId,
    OrderedProducts,
  }: UpdateOrderRequest = request.body;

  const { id } = request.params;

  const orderId = Number(id);

  console.log(id);

  if (isNaN(orderId)) {
    throw new AppError("Invalid order id");
  }

  const responseData = await createOrderUseCase.execute({
    orderId,
    customerCode,
    deliveryDate,
    paymentDate,
    paymentStatus,
    userId,
    OrderedProducts,
  });

  return response.status(204).json({
    message: "Order updated successfully",
    data: {},
  });
}
