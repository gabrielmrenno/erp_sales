import { Order, OrderedProducts } from "@prisma/client";
import { IOrdersRepository } from "../../repositories/orders-repository-interface";
import { AppError } from "../../errors/app-error";
import { IOrderedProductsRepository } from "../../repositories/ordered-products-repository-interface";
import { IProductsInfoRepository } from "../../repositories/product-repository-interface";
import { calculateTotalsOnOrder } from "../utils/orders";

interface GetOrderUseCaseRequest {
  code: number;
}

interface OrderWithProducts extends Order {
  items: OrderedProducts[];
}

interface GetOrderUseCaseResponse {
  orderWithProducts: OrderWithProducts;
  totalValue: number;
  totalWeight: number;
}

export class GetOrderUseCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private orderedProductsInfoRepository: IOrderedProductsRepository,
    private productsInfoRepository: IProductsInfoRepository
  ) {}

  async execute({
    code,
  }: GetOrderUseCaseRequest): Promise<GetOrderUseCaseResponse> {
    const order = await this.ordersRepository.getById(code);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    const items = await this.orderedProductsInfoRepository.getProductsByOrderId(
      order?.id
    );

    const orderWithProducts: OrderWithProducts = {
      ...order,
      items,
    };

    const productsInfo = await this.productsInfoRepository.listAvailable();

    const { totalValue, totalWeight } = calculateTotalsOnOrder(
      items,
      productsInfo
    );

    return { orderWithProducts, totalValue, totalWeight };
  }
}
