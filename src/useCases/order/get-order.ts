import { Order, OrderedProducts } from "@prisma/client";
import {
  GetOrderResponse,
  IOrdersRepository,
} from "../../repositories/orders-repository-interface";
import { AppError } from "../../errors/app-error";
import { IOrderedProductsRepository } from "../../repositories/ordered-products-repository-interface";
import { IProductsInfoRepository } from "../../repositories/products-info-repository-interface";
import { calculateTotalsOnOrderedProduct } from "../../utils/orders";

interface GetOrderUseCaseRequest {
  code: number;
}

interface GetOrderUseCaseResponse {
  order: GetOrderResponse;
  totalValue: number;
  totalWeight: number;
}

export class GetOrderUseCase {
  constructor(private ordersRepository: IOrdersRepository) {}

  async execute({
    code,
  }: GetOrderUseCaseRequest): Promise<GetOrderUseCaseResponse> {
    const order = await this.ordersRepository.getById(code);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    const { totalValue, totalWeight } = calculateTotalsOnOrderedProduct(
      order.OrderedProducts
    );

    return { order, totalValue, totalWeight };
  }
}
