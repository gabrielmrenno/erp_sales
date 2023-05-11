import { Request, Response } from "express";
import { ProductionLaunchesRepository } from "../../../repositories/implementations/production-launches-repository";
import { UpdateProductionLaunchUseCase } from "../../../useCases/production-launch/update-use-case";
import { ProductsRepository } from "../../../repositories/implementations/products-repository";

interface UpdateProductionLaunchUseCaseRequest {
  date?: Date | string;
  startHour?: string;
  endHour?: string;
  rawMaterial?: string;
  rawMaterialBatch?: string;
  description?: string;
  amount?: number;
}

export async function updateProductionLaunches(
  request: Request,
  response: Response
) {
  const productionLaunchesRepository = new ProductionLaunchesRepository();
  const productsRepository = new ProductsRepository();

  const createProductionLaunchUseCase = new UpdateProductionLaunchUseCase(
    productsRepository,
    productionLaunchesRepository
  );

  const {
    amount,
    date,
    description,
    endHour,
    rawMaterial,
    rawMaterialBatch,
    startHour,
  }: UpdateProductionLaunchUseCaseRequest = request.body;

  const { id } = request.params;

  const responseData = await createProductionLaunchUseCase.execute({
    id,
    amount,
    date,
    description,
    endHour,
    rawMaterial,
    rawMaterialBatch,
    startHour,
  });

  return response.status(200).json(responseData);
}
