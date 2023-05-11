import { ProductionLaunch } from "@prisma/client";
import { IProductionLaunchesRepository } from "../../repositories/production-launches-repository-interface";
import { AppError } from "../../errors/app-error";

export class GetProductionLaunchUseCase {
  constructor(
    private productionLaunchesRepository: IProductionLaunchesRepository
  ) {}

  async execute(id: string): Promise<ProductionLaunch | null> {
    // Get all ProductionLaunches
    const productionLaunches = await this.productionLaunchesRepository.getById(
      id
    );

    if (!productionLaunches) {
      throw new AppError("Production Launch not found", 404);
    }

    return productionLaunches;
  }
}
