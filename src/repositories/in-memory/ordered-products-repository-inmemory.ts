import { Prisma, OrderedProducts } from "@prisma/client";
import { IOrderedProductsRepository } from "../ordered-products-repository-interface";

export class OrderedProductsRepositoryInMemory
  implements IOrderedProductsRepository
{
  items: OrderedProducts[] = [];

  async create(
    data: Prisma.OrderedProductsUncheckedCreateInput[]
  ): Promise<void> {
    await data.forEach((item) => {
      this.items.push({
        amount: item.amount,
        orderId: item.orderId,
        productInfoCode: item.productInfoCode,
        totalValue: new Prisma.Decimal(item.totalValue.toString()),
      });
    });
  }

  async getProductsByOrderId(id: number): Promise<OrderedProducts[]> {
    return this.items.filter((item) => item.orderId === id);
  }
}
