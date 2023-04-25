import { Order } from "@prisma/client";
import { IOrdersRepository } from "../../repositories/orders-repository-interface";

interface FetchOrdersUseCaseRequest {
  page?: number;
  initialInterval?: Date;
  finalInterval?: Date;
  code?: number;
}

interface FetchOrdersUseCaseResponse {
  orders: Order[];
}
export class FetchOrdersUseCase {
  constructor(private ordersRepository: IOrdersRepository) {}

  async execute({
    page,
    initialInterval,
    finalInterval,
    code,
  }: FetchOrdersUseCaseRequest): Promise<FetchOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.fetchAll({
      page,
      initialInterval,
      finalInterval,
      code,
    });

    return { orders };
  }
}
