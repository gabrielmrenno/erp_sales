import { AppError } from "../../errors/app-error";
import { IMissingProductsRepository } from "../../repositories/missing-products-repository-interface";
import { IOrderedProductsRepository } from "../../repositories/ordered-products-repository-interface";
import { IOrdersRepository } from "../../repositories/orders-repository-interface";

interface UpdateOrderedProducts {
  amount: number;
  productInfoCode: number;
}

interface UpdateOrderUseCaseRequest {
  orderId: number;

  deliveryDate: Date | null;
  customerCode: number;
  userId: string;
  paymentStatus: string;
  paymentDate: Date | null;

  items: UpdateOrderedProducts[];
}

export class UpdateOrderUseCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private orderedProductsRepository: IOrderedProductsRepository,
    private missingProductsRepository: IMissingProductsRepository
  ) {}

  async execute({
    orderId,
    deliveryDate,
    customerCode,
    userId,
    paymentStatus,
    paymentDate,
    items,
  }: UpdateOrderUseCaseRequest): Promise<void> {
    const order = await this.ordersRepository.getById(orderId);

    if (!order) {
      throw new AppError("Order not found", 404);
    }
    const orderProductsObjectFormatted = order.OrderedProducts.map(
      (orderedProduct) => {
        return {
          ...orderedProduct,
          productPrice: Number(orderedProduct.productPrice),
          productWeight: Number(orderedProduct.productWeight),
        };
      }
    );
    // Compare products of order and orderUpdated, if not equal, delete product array and create a new one
    const orderProductsObjectString = JSON.stringify(
      orderProductsObjectFormatted
    );
    const orderUpdatedProductsObjectString = JSON.stringify(items);
    if (orderProductsObjectString !== orderUpdatedProductsObjectString) {
      await this.orderedProductsRepository.deleteMany(orderId);
      await this.missingProductsRepository.deleteMany(orderId);
      await this.ordersRepository.populateOrderItems({
        orderId: order.id,
        items,
      });
    }

    await this.ordersRepository.update({
      id: orderId,
      deliveryDate,
      customerCode,
      userId,
      paymentStatus,
      paymentDate,
    });
  }
}
