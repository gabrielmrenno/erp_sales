import { Request, Response } from "express";
import { ProductsInfoRepository } from "../../../repositories/implementations/products-info-repository";
import { AppError } from "../../../errors/app-error";
import { DeleteProductUseCase } from "../../../useCases/products/delete-product-usecase";

export async function deleteProductInfo(request: Request, response: Response) {
  const productsInfoRepository = new ProductsInfoRepository();
  const deleteProductUseCase = new DeleteProductUseCase(productsInfoRepository);

  const { code } = request.params;

  const codeFormatted = Number(code);

  if (isNaN(codeFormatted)) {
    throw new AppError("Invalid code");
  }

  await deleteProductUseCase.execute(codeFormatted);

  return response.status(200).json({
    message: "Product info deleted successfully",
  });
}
