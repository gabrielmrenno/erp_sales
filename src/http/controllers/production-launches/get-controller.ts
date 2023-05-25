import { Request, Response } from "express";
import { ProductionLaunchesRepository } from "../../../repositories/implementations/production-launches-repository";
import { GetProductionLaunchUseCase } from "../../../useCases/production-launch/get-use-case";

export async function getProductionLaunch(
  request: Request,
  response: Response
) {
  const { id } = request.params;

  const productionLaunchesRepository = new ProductionLaunchesRepository();

  const createProductionLaunchUseCase = new GetProductionLaunchUseCase(
    productionLaunchesRepository
  );

  const responseData = await createProductionLaunchUseCase.execute(id);

  return response.status(200).json(responseData);
}
