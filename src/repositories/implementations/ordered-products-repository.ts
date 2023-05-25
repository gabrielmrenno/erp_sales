import { OrderedProducts, Prisma } from "@prisma/client";
import {
  IOrderedProductsRepository,
  IPutProductsOnOrderParams,
} from "../ordered-products-repository-interface";
import { prisma } from "../../database/prisma-client";
import { AppError } from "../../errors/app-error";

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

  async putProductsOnOrder({
    amount,
    orderId,
    productId,
  }: IPutProductsOnOrderParams): Promise<void> {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) throw new AppError("Product not found");

    const productInfo = await prisma.productInfo.findFirst({
      where: {
        code: product!.productInfoCode,
      },
    });

    // create ordered product or update if already exists
    const orderedProduct = await prisma.orderedProducts.findFirst({
      where: {
        orderId,
        productId,
      },
    });

    if (orderedProduct) {
      const newAmountOrderedProduct = orderedProduct.amount + amount;

      await prisma.orderedProducts.update({
        where: {
          orderId_productId: {
            orderId,
            productId,
          },
        },
        data: {
          amount: newAmountOrderedProduct,
        },
      });
    } else {
      await prisma.orderedProducts.create({
        data: {
          amount,
          orderId,
          productId,
          productPrice: productInfo?.price!,
          productWeight: productInfo?.weight!,
        },
      });
    }

    // new amount on stock
    const newAmount = product!.amount - amount;

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        amount: newAmount,
      },
    });
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
