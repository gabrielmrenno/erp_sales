import { Request, Response } from "express";
import { ProductsInfoRepository } from "../../../repositories/implementations/products-info-repository";
import { ListAvailableProductsUseCase } from "../../../useCases/products/list-available-products-usecase";

export async function listProductsInfo(request: Request, response: Response) {
  const productsInfoRepository = new ProductsInfoRepository();
  const listAvailableProductsUseCase = new ListAvailableProductsUseCase(
    productsInfoRepository
  );

  const productsInfo = await listAvailableProductsUseCase.execute();

  return response.status(200).json(productsInfo);
}
