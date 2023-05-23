import { MissingProducts, OrderedProducts } from "@prisma/client";
import { IOrdersRepository } from "../../repositories/orders-repository-interface";
import { AppError } from "../../errors/app-error";
import { IOrderedProductsRepository } from "../../repositories/ordered-products-repository-interface";
import { IMissingProductsRepository } from "../../repositories/missing-products-repository-interface";
import { IProductsInfoRepository } from "../../repositories/products-info-repository-interface";
import { IProductsRepository } from "../../repositories/products-repository-interface";

interface UpdateOrderedProducts {
  amount: number;
  productId: string;
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
    private missingProductsRepository: IMissingProductsRepository,
    private productsRepository: IProductsRepository,
    private productsInfoRepository: IProductsInfoRepository,
    private orderedProductsRepository: IOrderedProductsRepository
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
      // delete OrderedProducts and MissingProducts
      await this.orderedProductsRepository.deleteMany(order.id);
      await this.missingProductsRepository.deleteMany(order.id);

      // get list of available Products on stock -> replace products
      const products = await this.productsRepository.listProductsOnStock();
      const productsInfo = await this.productsInfoRepository.listAvailable();

      // for each product on items, verify if it has products available on Products

      items.forEach(async (item) => {
        const product = products.find(
          (product) => product.id === item.productId
        );
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
