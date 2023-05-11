import { ProductionLaunch } from "@prisma/client";
import { IProductionLaunchesRepository } from "../../repositories/production-launches-repository-interface";
import { AppError } from "../../errors/app-error";
import { IProductsRepository } from "../../repositories/products-repository-interface";
import { IProductsInfoRepository } from "../../repositories/products-info-repository-interface";

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
