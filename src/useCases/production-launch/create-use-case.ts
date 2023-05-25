import { Prisma, ProductionLaunch } from "@prisma/client";
import { AppError } from "../../errors/app-error";
import { IProductsRepository } from "../../repositories/products-repository-interface";
import { IProductionLaunchesRepository } from "../../repositories/production-launches-repository-interface";
import { IProductsInfoRepository } from "../../repositories/products-info-repository-interface";

export class CreateProductionLaunchUseCase {
  constructor(
    private productsRepository: IProductsRepository,
    private productionLaunchesRepository: IProductionLaunchesRepository,
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

    return productionLaunch;
  }
}
