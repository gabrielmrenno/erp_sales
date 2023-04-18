import { Request, Response } from "express";
import { ProductsInfoRepository } from "../../../repositories/implementations/products-info-repository";
import { AppError } from "../../../errors/app-error";
import { UpdateProductUseCase } from "../../../useCases/products/update-product-usecase";
import { UpdatePriceProductUseCase } from "../../../useCases/products/update-price-product-usecase";

export async function updateProductInfoPrice(
  request: Request,
  response: Response
) {
  const productsInfoRepository = new ProductsInfoRepository();
  const updateProductUseCase = new UpdatePriceProductUseCase(
    productsInfoRepository
  );

  const { code } = request.params;
  const { price } = request.body;

  const codeFormatted = Number(code);

  if (isNaN(codeFormatted)) {
    throw new AppError("Invalid code");
  }

  const productInfo = await updateProductUseCase.execute(codeFormatted, price);

  return response.status(200).json({
    message: "Product info updated successfully",
    data: {
      code: productInfo.code,
    },
  });
}
