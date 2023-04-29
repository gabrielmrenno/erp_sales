import { Order, OrderedProducts } from "@prisma/client";
import {
  GetOrderResponse,
  IOrdersRepository,
} from "../../repositories/orders-repository-interface";
import { AppError } from "../../errors/app-error";
import { IOrderedProductsRepository } from "../../repositories/ordered-products-repository-interface";
import { IProductsInfoRepository } from "../../repositories/product-repository-interface";
import { calculateTotalsOnOrderedProduct } from "../utils/orders";

interface DeleteOrderUseCaseRequest {
  code: number;
}

export class DeleteOrderUseCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private orderedProductsInfoRepository: IOrderedProductsRepository
  ) {}

  async execute({ code }: DeleteOrderUseCaseRequest): Promise<void> {
    const order = await this.ordersRepository.getById(code);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    await this.orderedProductsInfoRepository.deleteMany(order.id);

    await this.ordersRepository.delete(order.id);
  }
}
