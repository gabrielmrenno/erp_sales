import { Request, Response } from "express";
import { ProductsInfoRepository } from "../../../repositories/implementations/products-info-repository";
import { AppError } from "../../../errors/app-error";
import { UpdateProductInfoUseCase } from "../../../useCases/products/update-product-usecase";

export async function updateProductInfo(request: Request, response: Response) {
  const productsInfoRepository = new ProductsInfoRepository();
  const updateProductInfoUseCase = new UpdateProductInfoUseCase(
    productsInfoRepository
  );

  const { code } = request.params;
  const {
    name,
    group,
    price,
    description,
    unit,
    weight,
  }: IUpdateProductInfoDTO = request.body;

  const codeFormatted = Number(code);

  if (isNaN(codeFormatted)) {
    throw new AppError("Invalid code");
  }

  const productInfo = await updateProductInfoUseCase.execute(codeFormatted, {
    name,
    group,
    price,
    description,
    unit,
    weight,
  });

  return response.status(200).json({
    message: "Product info updated successfully",
    data: {
      code: productInfo.code,
    },
  });
}
