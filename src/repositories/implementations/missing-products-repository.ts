import { Prisma, MissingProducts, ProductInfo } from "@prisma/client";
import { IMissingProductsRepository } from "../missing-products-repository-interface";
import { prisma } from "../../database/prisma-client";

export class MissingProductsRepository implements IMissingProductsRepository {
  async create(data: MissingProducts): Promise<MissingProducts> {
    const missingProduct = await prisma.missingProducts.create({
      data,
    });

    return missingProduct;
  }
  async list(): Promise<MissingProducts[]> {
    const missingProducts = await prisma.missingProducts.findMany();

    return missingProducts;
  }

  async listByProductInfoCode(productInfoCode: number) {
    const missingProducts = await prisma.missingProducts.findMany({
      where: {
        productInfoCode,
      },
      include: {
        order: true,
      },
    });

    return missingProducts;
  }

  async deleteMany(orderId: number): Promise<void> {
    await prisma.missingProducts.deleteMany({
      where: {
        orderId,
      },
    });
  }

  async delete({
    orderId,
    productInfoCode,
  }: Prisma.MissingProductsOrderIdProductInfoCodeCompoundUniqueInput): Promise<void> {
    await prisma.missingProducts.delete({
      where: {
        orderId_productInfoCode: {
          orderId,
          productInfoCode,
        },
      },
    });
  }
}
