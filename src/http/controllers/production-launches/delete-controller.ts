import { Request, Response } from "express";
import { ProductionLaunchesRepository } from "../../../repositories/implementations/production-launches-repository";
import { DeleteProductionLaunchUseCase } from "../../../useCases/production-launch/delete-use-case";
import { ProductsRepository } from "../../../repositories/implementations/products-repository";

export async function deleteProductionLaunch(
  request: Request,
  response: Response
) {
  const { id } = request.params;

  const productsRepository = new ProductsRepository();
  const productionLaunchesRepository = new ProductionLaunchesRepository();

  const createProductionLaunchUseCase = new DeleteProductionLaunchUseCase(
    productsRepository,
    productionLaunchesRepository
  );

  await createProductionLaunchUseCase.execute(id);

  return response.status(200).json({
    message: "Production Launch deleted successfully",
  });
}
