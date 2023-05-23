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
  productId: string;
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
    private usersRepository: IUsersRepository,
    private productsRepository: IProductsRepository,
    private productsInfoRepository: IProductsInfoRepository,
    private orderedProductsRepository: IOrderedProductsRepository,
    private missingProductsRepository: IMissingProductsRepository
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

    // get list of available Products on stock -> replace products
    const products = await this.productsRepository.listProductsOnStock();
    const productsInfo = await this.productsInfoRepository.listAvailable();

    // for each product on items, verify if it has products available on Products

    items.forEach(async (item) => {
      const product = products.find((product) => product.id === item.productId);
      const productInfo = productsInfo.find(
        (productInfo) => productInfo.code === product?.productInfoCode
      );

      // if it has product on stock, create OrderedProduct
      if (product!.amount >= item.amount) {
        await this.orderedProductsRepository.create({
          amount: item.amount,
          orderId: order.id,
          productId: item.productId,
          productPrice: productInfo!.price,
          productWeight: productInfo!.weight,
        });

        return;
      }
      // TODO: if not, create an MissingProduct
      await this.missingProductsRepository.create({
        amount: item.amount,
        orderId: order.id,
        productInfoCode: productInfo!.code,
      });
    });

    return { orderId: order.id };
  }
}
