import { ProductionLaunch } from "@prisma/client";
import { IProductionLaunchesRepository } from "../../repositories/production-launches-repository-interface";
import { AppError } from "../../errors/app-error";
import { IProductsRepository } from "../../repositories/products-repository-interface";

import dayjs from "dayjs";

interface UpdateProductionLaunchUseCaseParams {
  id: string;
  batch?: string;
  date?: Date | string;
  startHour?: string;
  endHour?: string;
  rawMaterial?: string;
  rawMaterialBatch?: string;
  description?: string;
  productInfoCode?: number;
  amount?: number;
}

export class UpdateProductionLaunchUseCase {
  constructor(
    private productsRepository: IProductsRepository,
    private productionLaunchesRepository: IProductionLaunchesRepository
  ) {}

  async execute({
    id,
    amount,
    date,
    description,
    endHour,
    rawMaterial,
    rawMaterialBatch,
    startHour,
  }: UpdateProductionLaunchUseCaseParams): Promise<ProductionLaunch> {
    // Verify if ProductionLaunch exists
    const productionLaunch = await this.productionLaunchesRepository.getById(
      id
    );

    if (!productionLaunch) {
      throw new AppError("ProductionLaunch not found", 404);
    }

    if (amount) {
      const amountDifference = amount - productionLaunch.amount;
      const productInStock = await this.productsRepository.get({
        productBatch: productionLaunch.batch,
        productInfoCode: productionLaunch.productInfoCode,
      });
      this.productsRepository.updateAmount({
        id: productInStock?.id!,
        amount: amountDifference,
      });
    }

    let dateStartLaunch: Date | undefined;
    let dateEndLaunch: Date | undefined;

    if (startHour) {
      const [startHours, startMinutes] = startHour.split(":");
      const intermediateDate = date ?? productionLaunch.date;
      dateStartLaunch = new Date(intermediateDate);
      dateStartLaunch.setHours(Number(startHours));
      dateStartLaunch.setMinutes(Number(startMinutes));
    }

    if (endHour) {
      const [endHours, endMinutes] = endHour.split(":");
      const intermediateDate = date ?? productionLaunch.date;
      dateEndLaunch = new Date(intermediateDate);
      dateEndLaunch.setHours(Number(endHours));
      dateEndLaunch.setMinutes(Number(endMinutes));
    }

    // Can update ProductionLaunch after 10min before created
    const now = new Date();
    const productionLaunchDate = new Date(productionLaunch.date);
    const diff = dayjs(now).diff(productionLaunchDate, "minute");

    if (diff > 10) {
      throw new AppError(
        "Can't update Production Launch after 10min before created",
        400
      );
    }

    // Update all ProductionLaunches
    const productionLaunches = await this.productionLaunchesRepository.update({
      id,
      amount,
      date,
      description,
      endHour: dateEndLaunch,
      rawMaterial,
      rawMaterialBatch,
      startHour: dateStartLaunch,
    });

    return productionLaunches;
  }
}
