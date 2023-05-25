import { Request, Response } from "express";
import { ProductsInfoRepository } from "../../../repositories/implementations/products-info-repository";
import { AppError } from "../../../errors/app-error";
import { DeleteProductInfoUseCase } from "../../../useCases/products-info/delete-product-usecase";

export async function deleteProductInfo(request: Request, response: Response) {
  const productsInfoRepository = new ProductsInfoRepository();
  const deleteProductInfoUseCase = new DeleteProductInfoUseCase(
    productsInfoRepository
  );

  const { code } = request.params;

  const codeFormatted = Number(code);

  if (isNaN(codeFormatted)) {
    throw new AppError("Invalid code");
  }

  await deleteProductInfoUseCase.execute(codeFormatted);

  return response.status(200).json({
    message: "Product info deleted successfully",
  });
}
