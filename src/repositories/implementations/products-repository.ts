import { Prisma, Product, ProductionLaunch } from "@prisma/client";
import { prisma } from "../../database/prisma-client";
import { IProductsRepository } from "../products-repository-interface";

interface GetProduct {
  productBatch: string;
  productInfoCode: number;
}

interface UpdateProduct {
  id: string;
  amount: number;
}

export class ProductsRepository implements IProductsRepository {
  async create(data: Prisma.ProductCreateManyInput): Promise<Product> {
    const product = await prisma.product.create({
      data,
    });
    return product;
  }
  async get(data: GetProduct): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        productBatch: data.productBatch,
        productInfoCode: data.productInfoCode,
      },
    });

    return product;
  }
  async updateAmount({ id, amount }: UpdateProduct): Promise<void> {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        amount: {
          increment: amount,
        },
      },
    });
  }
}
