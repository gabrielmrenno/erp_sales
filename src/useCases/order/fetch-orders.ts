import { Customer, Order, OrderedProducts } from "@prisma/client";
import { IOrdersRepository } from "../../repositories/orders-repository-interface";
import { calculateTotalsOnOrderedProduct } from "../../utils/orders";

interface FetchOrdersUseCaseRequest {
  page?: number;
  initialInterval?: Date;
  finalInterval?: Date;
  code?: number;
}

interface OrderToBeReturned extends Order {
  OrderedProducts: OrderedProducts[];
  customer: Customer;
  totalOrderValue: number;
  totalOrderWeight: number;
}

interface FetchOrdersUseCaseResponse {
  orders: OrderToBeReturned[];
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

    const returnedOrders: OrderToBeReturned[] = orders.map((order) => {
      const { totalValue, totalWeight } = calculateTotalsOnOrderedProduct(
        order.OrderedProducts
      );

      return {
        ...order,
        totalOrderValue: totalValue,
        totalOrderWeight: totalWeight,
      };
    });

    return { orders: returnedOrders };
  }
}
