import { Order, OrderedProducts } from "@prisma/client";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";
import { IOrdersRepository } from "../../repositories/orders-repository-interface";
import { AppError } from "../../errors/app-error";
import { IUsersRepository } from "../../repositories/users-repository-interface";
import { IOrderedProductsRepository } from "../../repositories/ordered-products-repository-interface";

type CreateOrderOrderedProducts = Omit<OrderedProducts, "orderId">;

interface CreateOrderUseCaseRequest {
  items: CreateOrderOrderedProducts[];
  customerCode: number;
  userId: string;
}

interface CreateOrderUseCaseResponse {
  order: Order;
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
      items,
      customerCode: customerCode,
      userId: user.id,
      paymentStatus: "pendent",
      active: true,
    });

    return { order };
  }
}