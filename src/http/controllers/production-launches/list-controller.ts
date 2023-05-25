import { Request, Response } from "express";
import { ProductionLaunchesRepository } from "../../../repositories/implementations/production-launches-repository";
import { ListAllProductionLaunchUseCase } from "../../../useCases/production-launch/list-use-case";

export async function listProductionLaunches(
  request: Request,
  response: Response
) {
  const productionLaunchesRepository = new ProductionLaunchesRepository();

  const createProductionLaunchUseCase = new ListAllProductionLaunchUseCase(
    productionLaunchesRepository
  );

  const responseData = await createProductionLaunchUseCase.execute();

  return response.status(200).json(responseData);
}
