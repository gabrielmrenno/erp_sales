import { OrderedProducts, Prisma } from "@prisma/client";
import { IOrderedProductsRepository } from "../ordered-products-repository-interface";
import { prisma } from "../../database/prisma-client";

export class OrderedProductsRepository implements IOrderedProductsRepository {
  async create(
    data: Prisma.OrderedProductsUncheckedCreateInput[]
  ): Promise<void> {
    await prisma.orderedProducts.createMany({
      data,
    });
  }
  getProductsByOrderId(id: number): Promise<OrderedProducts[]> {
    throw new Error("Method not implemented.");
  }

  async deleteMany(orderId: number): Promise<void> {
    await prisma.orderedProducts.deleteMany({
      where: {
        orderId,
      },
    });
  }
}