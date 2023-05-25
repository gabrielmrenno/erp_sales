import { ICustomersRepository } from "../../repositories/customers-repository-interface";
import { IOrdersRepository } from "../../repositories/orders-repository-interface";
import { AppError } from "../../errors/app-error";
import { IUsersRepository } from "../../repositories/users-repository-interface";
import { IOrderedProductsRepository } from "../../repositories/ordered-products-repository-interface";
import { InOrder } from "../../dtos/order";
import { IProductsRepository } from "../../repositories/products-repository-interface";
import { IProductsInfoRepository } from "../../repositories/products-info-repository-interface";
import { IMissingProductsRepository } from "../../repositories/missing-products-repository-interface";

interface CreateOrderedProducts {
  amount: number;
  productInfoCode: number;
}

interface CreateOrderUseCaseRequest {
  items: CreateOrderedProducts[];
  customerCode: number;
  userId: string;
}

interface CreateOrderUseCaseResponse {
  orderId: number;
}

export class CreateOrderUseCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private customersRepository: ICustomersRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    items,
    customerCode,
    userId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const customer = await this.customersRepository.findByCode(customerCode);

    if (!customer) {
      throw new AppError("Customer doesn't exist");
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User doesn't exist");
    }

    const order = await this.ordersRepository.create({
      customerCode: customerCode,
      userId: user.id,
      paymentStatus: "pendent",
      active: true,
    });

    await this.ordersRepository.populateOrderItems({
      orderId: order.id,
      items,
    });

    return { orderId: order.id };
  }
}
