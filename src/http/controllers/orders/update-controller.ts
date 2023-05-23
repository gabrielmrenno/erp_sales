import { Request, Response } from "express";
import { OrdersRepository } from "../../../repositories/implementations/orders-respository";
import { Order, OrderedProducts } from "@prisma/client";
import { OrderedProductsRepository } from "../../../repositories/implementations/ordered-products-repository";
import { AppError } from "../../../errors/app-error";
import { UpdateOrderUseCase } from "../../../useCases/order/update-order";
import { MissingProductsRepository } from "../../../repositories/implementations/missing-products-repository";
import { ProductsRepository } from "../../../repositories/implementations/products-repository";
import { ProductsInfoRepository } from "../../../repositories/implementations/products-info-repository";
interface UpdateOrderedProducts {
  amount: number;
  productId: string;
}

interface UpdateOrderRequest extends Order {
  items: UpdateOrderedProducts[];
}

export async function updateOrder(request: Request, response: Response) {
  const ordersRepository = new OrdersRepository();
  const missingProductsRepository = new MissingProductsRepository();
  const productsRepository = new ProductsRepository();
  const productsInfoRepository = new ProductsInfoRepository();
  const orderedProductsRepository = new OrderedProductsRepository();

  const createOrderUseCase = new UpdateOrderUseCase(
    ordersRepository,
    missingProductsRepository,
    productsRepository,
    productsInfoRepository,
    orderedProductsRepository
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
    items,
  });

  return response.status(204).json({
    message: "Order updated successfully",
    data: {},
  });
}
