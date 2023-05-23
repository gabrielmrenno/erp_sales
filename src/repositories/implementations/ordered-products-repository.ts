import { OrderedProducts, Prisma } from "@prisma/client";
import { IOrderedProductsRepository } from "../ordered-products-repository-interface";
import { prisma } from "../../database/prisma-client";

export class OrderedProductsRepository implements IOrderedProductsRepository {
  async create(data: OrderedProducts): Promise<void> {
    await prisma.orderedProducts.create({
      data,
    });

    const product = await prisma.product.findUnique({
      where: {
        id: data.productId,
      },
    });

    // new amount on stock
    const newAmount = product!.amount - data.amount;

    await prisma.product.update({
      where: {
        id: data.productId,
      },
      data: {
        amount: newAmount,
      },
    });
  }
  async createMany(
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
    const orderedProductsToBeDeleted = await prisma.orderedProducts.findMany({
      where: {
        orderId,
      },
    });

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: orderedProductsToBeDeleted.map((product) => product.productId),
        },
      },
    });

    // add to stock
    products.forEach(async (product) => {
      const orderedProduct = orderedProductsToBeDeleted.find(
        (orderedProduct) => orderedProduct.productId === product.id
      );

      const newAmount = product.amount + orderedProduct!.amount;

      await prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          amount: newAmount,
        },
      });
    });

    await prisma.orderedProducts.deleteMany({
      where: {
        orderId,
      },
    });
  }
}
