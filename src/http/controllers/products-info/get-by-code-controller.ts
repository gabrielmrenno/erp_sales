import { Request, Response } from "express";
import { ProductsInfoRepository } from "../../../repositories/implementations/products-info-repository";
import { ListProductByCodeUseCase } from "../../../useCases/products/list-product-by-code-usecase";
import { AppError } from "../../../errors/app-error";

export async function getProductsInfoByCode(
  request: Request,
  response: Response
) {
  const productsInfoRepository = new ProductsInfoRepository();
  const listAvailableProductsUseCase = new ListProductByCodeUseCase(
    productsInfoRepository
  );

  const { code } = request.params;

  const codeFormatted = Number(code);

  if (isNaN(codeFormatted)) {
    throw new AppError("Invalid code");
  }

  const productInfo = await listAvailableProductsUseCase.execute(codeFormatted);

  return response.status(200).json(productInfo);
}
