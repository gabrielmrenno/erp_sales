import { Order, OrderedProducts } from "@prisma/client";
import { IOrdersRepository } from "../../repositories/orders-repository-interface";
import { AppError } from "../../errors/app-error";
import { IOrderedProductsRepository } from "../../repositories/ordered-products-repository-interface";

interface UpdateOrderUseCaseRequest {
  code: number;
}

interface UpdateOrderUseCaseResponse {
  order: Order;
}

export class UpdateOrderUseCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private orderedProductsInfo: IOrderedProductsRepository
  ) {}

  async execute({
    code,
  }: UpdateOrderUseCaseRequest): Promise<UpdateOrderUseCaseResponse> {
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
