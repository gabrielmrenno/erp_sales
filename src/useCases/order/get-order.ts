import { Order, OrderedProducts } from "@prisma/client";
import { IOrdersRepository } from "../../repositories/orders-repository-interface";
import { AppError } from "../../errors/app-error";
import { IOrderedProductsRepository } from "../../repositories/ordered-products-repository-interface";

interface GetOrderUseCaseRequest {
  code: number;
}

interface OrderWithProducts extends Order {
  items: OrderedProducts[];
}

interface GetOrderUseCaseResponse {
  orderWithProducts: OrderWithProducts;
}

export class GetOrderUseCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private orderedProductsInfo: IOrderedProductsRepository
  ) {}

  async execute({
    code,
  }: GetOrderUseCaseRequest): Promise<GetOrderUseCaseResponse> {
    const order = await this.ordersRepository.getById(code);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    const items = await this.orderedProductsInfo.getProductsByOrderId(
      order?.id
    );

    const orderWithProducts: OrderWithProducts = {
      ...order,
      items,
    };

    return { orderWithProducts };
  }
}
