import { IProductionLaunchesRepository } from "../../repositories/production-launches-repository-interface";
import { AppError } from "../../errors/app-error";
import { IProductsRepository } from "../../repositories/products-repository-interface";

import dayjs from "dayjs";

export class DeleteProductionLaunchUseCase {
  constructor(
    private productsRepository: IProductsRepository,
    private productionLaunchesRepository: IProductionLaunchesRepository
  ) {}

  async execute(id: string): Promise<void> {
    // Verify if ProductionLaunch exists
    const productionLaunch = await this.productionLaunchesRepository.getById(
      id
    );

    if (!productionLaunch) {
      throw new AppError("Production Launch not found", 404);
    }

    // decrement product quantity
    const productInStock = await this.productsRepository.get({
      productBatch: productionLaunch.batch,
      productInfoCode: productionLaunch.productInfoCode,
    });

    await this.productsRepository.updateAmount({
      id: productInStock?.id!,
      amount: -productionLaunch.amount,
    });

    // Can delete ProductionLaunch after 10min before created
    const now = new Date();
    const productionLaunchDate = new Date(productionLaunch.date);
    const diff = dayjs(now).diff(productionLaunchDate, "minute");

    if (diff > 10) {
      throw new AppError(
        "Can't delete Production Launch after 10min before created",
        400
      );
    }

    // Delete ProductionLaunch
    await this.productionLaunchesRepository.delete(id);
  }
}
