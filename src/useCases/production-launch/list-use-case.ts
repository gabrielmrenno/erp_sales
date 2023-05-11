import { Prisma, ProductionLaunch } from "@prisma/client";
import { AppError } from "../../errors/app-error";
import { IProductsRepository } from "../../repositories/products-repository-interface";
import { IProductionLaunchesRepository } from "../../repositories/production-launches-repository-interface";
import { IProductsInfoRepository } from "../../repositories/products-info-repository-interface";

export class ListAllProductionLaunchUseCase {
  constructor(
    private productionLaunchesRepository: IProductionLaunchesRepository
  ) {}

  async execute(): Promise<ProductionLaunch[]> {
    // Get all ProductionLaunches
    const productionLaunches = await this.productionLaunchesRepository.list();

    return productionLaunches;
  }
}
