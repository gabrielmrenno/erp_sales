import { Request, Response } from "express";
import { ProductsInfoRepository } from "../../../repositories/implementations/products-info-repository";
import { ListAvailableProductsInfoUseCase } from "../../../useCases/products-info/list-available-products-usecase";

export async function listProductsInfo(request: Request, response: Response) {
  const productsInfoRepository = new ProductsInfoRepository();
  const listAvailableProductsInfoUseCase = new ListAvailableProductsInfoUseCase(
    productsInfoRepository
  );

  const productsInfo = await listAvailableProductsInfoUseCase.execute();

  return response.status(200).json(productsInfo);
}
