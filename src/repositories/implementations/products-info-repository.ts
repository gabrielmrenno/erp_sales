import { Decimal } from "@prisma/client/runtime";
import { prisma } from "../../database/prisma-client";
import { IProductsInfoRepository } from "../product-repository-interface";
import { ProductInfo } from "@prisma/client";

export class ProductsInfoRepository implements IProductsInfoRepository {
  async create(data: ICreateProductInfo): Promise<ProductInfo> {
    const product = await prisma.productInfo.create({
      data: {
        ...data,
        active: true,
      },
    });

    return product;
  }

  async findByName(name: string): Promise<ProductInfo | null> {
    const product = await prisma.productInfo.findUnique({
      where: {
        name,
      },
    });

    if (!product) {
      return null;
    }

    return product;
  }
  async findByCode(code: number): Promise<ProductInfo | null> {
    const product = await prisma.productInfo.findUnique({
      where: {
        code,
      },
    });

    if (!product) {
      return null;
    }

    return product;
  }

  async listAvailable(): Promise<ProductInfo[]> {
    const products = await prisma.productInfo.findMany({
      where: {
        active: true,
      },
    });

    return products;
  }
  async update(
    code: number,
    data: IUpdateProductInfoDTO
  ): Promise<ProductInfo> {
    const product = await prisma.productInfo.update({
      where: {
        code,
      },
      data,
    });

    return product;
  }
  async updatePrice(code: number, price: number): Promise<ProductInfo> {
    const product = await prisma.productInfo.update({
      where: {
        code,
      },
      data: {
        price,
      },
    });

    return product;
  }
  async delete(code: number): Promise<void> {
    await prisma.productInfo.update({
      where: {
        code,
      },
      data: {
        deletedAt: new Date(),
        active: false,
      },
    });
  }
}
