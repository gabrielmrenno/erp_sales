import { Prisma, ProductionLaunch } from "@prisma/client";
import { IProductionLaunchesRepository } from "../production-launches-repository-interface";
import { prisma } from "../../database/prisma-client";
import { MissingProductsRepository } from "./missing-products-repository";
import { OrderedProductsRepository } from "./ordered-products-repository";
import { ProductsRepository } from "./products-repository";

interface UpdateProductionLaunchUseCaseParams {
  id: string;
  batch?: string;
  date?: Date | string;
  startHour?: Date | string;
  endHour?: Date | string;
  rawMaterial?: string;
  rawMaterialBatch?: string;
  description?: string;
  productInfoCode?: number;
  amount?: number;
}

export class ProductionLaunchesRepository
  implements IProductionLaunchesRepository
{
  async create(
    data: Prisma.ProductionLaunchCreateManyInput
  ): Promise<ProductionLaunch> {
    const missingProductsRepository = new MissingProductsRepository();
    const orderedProductsRepository = new OrderedProductsRepository();
    const productsRepository = new ProductsRepository();

    // checking if it has missing products with productInfo
    const missingProducts =
      await missingProductsRepository.listByProductInfoCode(
        data.productInfoCode
      );

    let missingProductsAmount = missingProducts.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    let productToBeAllocatedToOrder = data.amount;

    // make production launch
    const productionLaunch = await prisma.productionLaunch.create({
      data,
    });

    // Verify if Product exists (by productBatch)
    let productInStock = await productsRepository.get({
      productBatch: data.batch,
      productInfoCode: data.productInfoCode,
    });

    // If exists, update amount by currentAmount + amountProduction, if not create
    if (productInStock) {
      await productsRepository.updateAmount({
        id: productInStock.id,
        amount: data.amount,
      });
    } else {
      productInStock = await productsRepository.create({
        amount: data.amount,
        productBatch: data.batch,
        productInfoCode: data.productInfoCode,
      });
    }

    // if it has missing products, put on orders
    if (missingProductsAmount > 0 && productToBeAllocatedToOrder > 0) {
      for (const missingProduct of missingProducts) {
        const amountToPutOnOrder = Math.min(
          missingProduct.amount,
          productToBeAllocatedToOrder
        );

        await orderedProductsRepository.putProductsOnOrder({
          amount: amountToPutOnOrder,
          orderId: missingProduct.orderId,
          productId: productInStock.id,
        });

        if (amountToPutOnOrder === missingProduct.amount) {
          await missingProductsRepository.delete({
            orderId: missingProduct.orderId,
            productInfoCode: missingProduct.productInfoCode,
          });
        } else {
          await missingProductsRepository.delete({
            orderId: missingProduct.orderId,
            productInfoCode: missingProduct.productInfoCode,
          });

          await missingProductsRepository.create({
            amount: missingProduct.amount - amountToPutOnOrder,
            orderId: missingProduct.orderId,
            productInfoCode: missingProduct.productInfoCode,
          });
        }

        productToBeAllocatedToOrder -= amountToPutOnOrder;
      }
    }

    return productionLaunch;
  }

  async list(): Promise<ProductionLaunch[]> {
    const productionLaunches = await prisma.productionLaunch.findMany();

    return productionLaunches;
  }

  async getById(id: string): Promise<ProductionLaunch | null> {
    const productionLaunch = await prisma.productionLaunch.findUnique({
      where: {
        id,
      },
    });

    return productionLaunch;
  }

  async update(
    data: UpdateProductionLaunchUseCaseParams
  ): Promise<ProductionLaunch> {
    const productionLaunched = await prisma.productionLaunch.update({
      where: {
        id: data.id,
      },
      data,
    });

    return productionLaunched;
  }

  async delete(id: string): Promise<void> {
    await prisma.productionLaunch.delete({
      where: {
        id,
      },
    });
  }
}
