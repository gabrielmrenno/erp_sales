import { Decimal } from "@prisma/client/runtime";
import { prisma } from "../../database/prisma-client";
import { ProductInfo } from "../../entities/product-info";
import { IProductsInfoRepository } from "../product-repository-interface";

export class ProductsInfoRepository implements IProductsInfoRepository {
  async create(data: ICreateProductInfo): Promise<ProductInfo> {
    const newProductInfo = new ProductInfo(data);
    const product = await prisma.productInfo.create({
      data: newProductInfo,
    });

    return {
      ...product,
      price: product.price.toNumber(),
      weight: product.weight.toNumber(),
    };
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

    return {
      ...product,
      price: product.price.toNumber(),
      weight: product.weight.toNumber(),
    };
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

    return {
      ...product,
      price: product.price.toNumber(),
      weight: product.weight.toNumber(),
    };
  }
  async listAvailable(): Promise<ProductInfo[]> {
    const products = await prisma.productInfo.findMany({
      where: {
        active: true,
      },
    });

    const productsFormatted = products.map((item) => ({
      ...item,
      price: item.price.toNumber(),
      weight: item.weight.toNumber(),
    }));

    return productsFormatted;
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

    return {
      ...product,
      price: product.price.toNumber(),
      weight: product.weight.toNumber(),
    };
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

    return {
      ...product,
      price: product.price.toNumber(),
      weight: product.weight.toNumber(),
    };
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
