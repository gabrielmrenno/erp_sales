import { Order, OrderedProducts } from "@prisma/client";
import { IOrdersRepository } from "../../repositories/orders-repository-interface";
import { AppError } from "../../errors/app-error";
import { IOrderedProductsRepository } from "../../repositories/ordered-products-repository-interface";
import { IOrderWithProductsAndCustomer } from "../../dtos/order";

interface UpdateOrderUseCaseRequest {
  orderId: number;

  deliveryDate: Date | null;
  customerCode: number;
  userId: string;
  paymentStatus: string;
  paymentDate: Date | null;

  OrderedProducts: OrderedProducts[];
}

export class UpdateOrderUseCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private orderedProductsInfo: IOrderedProductsRepository
  ) {}

  async execute({
    orderId,
    deliveryDate,
    customerCode,
    userId,
    paymentStatus,
    paymentDate,
    OrderedProducts,
  }: UpdateOrderUseCaseRequest): Promise<void> {
    const order = await this.ordersRepository.getById(orderId);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    // Compare products of order and orderUpdated, if not equal, delete product array and create a new one
    const orderProductsObjectString = JSON.stringify(order.OrderedProducts);
    const orderUpdatedProductsObjectString = JSON.stringify(OrderedProducts);
    if (orderProductsObjectString !== orderUpdatedProductsObjectString) {
      this.orderedProductsInfo.deleteMany(order.id);
      this.orderedProductsInfo.create(OrderedProducts);
    }

    this.ordersRepository.update({
      id: orderId,
      deliveryDate,
      customerCode,
      userId,
      paymentStatus,
      paymentDate,
    });
  }
}
