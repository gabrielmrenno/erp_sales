import { Prisma, ProductionLaunch } from "@prisma/client";
import { AppError } from "../../errors/app-error";
import { ProductsRepository } from "../../repositories/products-repository-interface";
import { ProductionLaunchesRepository } from "../../repositories/production-launches-repository-interface";
import { IProductsInfoRepository } from "../../repositories/products-info-repository-interface";

export class CreateProductionLaunchUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private productionLaunchesRepository: ProductionLaunchesRepository,
    private productsInfoRepository: IProductsInfoRepository
  ) {}

  async execute(
    data: Prisma.ProductionLaunchCreateManyInput
  ): Promise<ProductionLaunch> {
    // Verify if ProductInfo exists, if not, throw an error
    const productInfoExists = this.productsInfoRepository.findByCode(
      data.productInfoCode
    );

    if (!productInfoExists) {
      throw new AppError("Product doesn't exist");
    }

    // Create an ProductionLaunch
    const productionLaunch = await this.productionLaunchesRepository.create(
      data
    );

    // Verify if Product exists (by productBatch)
    const productInStock = await this.productsRepository.get({
      productBatch: data.batch,
      productInfoCode: data.productInfoCode,
    });

    // If exists, update amount by currentAmount + amountProduction, if not create
    if (productInStock) {
      await this.productsRepository.updateAmount({
        id: productInStock.id,
        amount: data.amount,
      });
    } else {
      await this.productsRepository.create({
        amount: data.amount,
        productBatch: data.batch,
        productInfoCode: data.productInfoCode,
      });
    }

    return productionLaunch;
  }
}
