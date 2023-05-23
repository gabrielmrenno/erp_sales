import { Prisma, Product, ProductInfo, ProductionLaunch } from "@prisma/client";
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

interface StockGroupByProductInfo extends ProductInfo {
  products: Product[];
  total: number;
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
          [amount >= 0 ? "increment" : "decrement"]: Math.abs(amount),
        },
      },
    });
  }

  async list(): Promise<Product[]> {
    const products = await prisma.product.findMany();

    return products;
  }

  async listProductsOnStock(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        amount: {
          gt: 0,
        },
      },
    });

    return products;
  }

  async listProductsGroupedByProductInfo(): Promise<StockGroupByProductInfo[]> {
    const products = await prisma.productInfo.findMany({
      include: {
        Product: {
          where: {
            amount: {
              gt: 0,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        code: "asc",
      },
    });

    const productsFormatted: StockGroupByProductInfo[] = products.map(
      (product) => {
        // calculate total of products infos
        const total = product.Product.reduce((acc, curr) => {
          let totalQuantity = acc + curr.amount;
          return totalQuantity;
        }, 0);

        const productFormatted: StockGroupByProductInfo = {
          ...product,
          products: product.Product,
          total,
        };

        return productFormatted;
      }
    );

    return productsFormatted;
  }

  async getOldestProductWithAmount(
    productInfoCode: number
  ): Promise<Product | null> {
    const oldestProductWithAmount = await prisma.product.findFirst({
      where: {
        amount: {
          gt: 0,
        },
        productInfoCode: productInfoCode,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return oldestProductWithAmount;
  }
}
