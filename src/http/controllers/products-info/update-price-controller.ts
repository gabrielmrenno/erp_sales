import { Request, Response } from "express";
import { ProductsInfoRepository } from "../../../repositories/implementations/products-info-repository";
import { AppError } from "../../../errors/app-error";
import { UpdatePriceProductInfoUseCase } from "../../../useCases/products-info/update-price-product-usecase";

export async function updateProductInfoPrice(
  request: Request,
  response: Response
) {
  const productsInfoRepository = new ProductsInfoRepository();
  const updateProductInfoUseCase = new UpdatePriceProductInfoUseCase(
    productsInfoRepository
  );

  const { code } = request.params;
  const { price } = request.body;

  const codeFormatted = Number(code);

  if (isNaN(codeFormatted)) {
    throw new AppError("Invalid code");
  }

  const productInfo = await updateProductInfoUseCase.execute(
    codeFormatted,
    price
  );

  return response.status(200).json({
    message: "Product info updated successfully",
    data: {
      code: productInfo.code,
    },
  });
}
