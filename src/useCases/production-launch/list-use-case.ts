import { ProductionLaunch } from "@prisma/client";
import { IProductionLaunchesRepository } from "../../repositories/production-launches-repository-interface";

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
