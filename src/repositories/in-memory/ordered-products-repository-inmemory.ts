import { Prisma, OrderedProducts } from "@prisma/client";
import { IOrderedProductsRepository } from "../ordered-products-repository-interface";

export class OrderedProductsRepositoryInMemory
  implements IOrderedProductsRepository
{
  items: OrderedProducts[] = [];
  async create(
    data: Prisma.OrderedProductsCreateInput[]
  ): Promise<OrderedProducts[]> {
    await data.forEach((item) => {
      this.items.push({
        amount: item.amount,
        orderId: item.order.connect!.id!,
        productInfoCode: item.productInfo.connect?.code!,
      });
    });

    return this.items;
  }
}
