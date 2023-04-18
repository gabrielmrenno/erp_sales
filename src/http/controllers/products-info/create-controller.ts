import { Request, Response } from "express";
import { ProductsInfoRepository } from "../../../repositories/implementations/products-info-repository";
import { CreateProductInfoUseCase } from "../../../useCases/products/create-product-usecase";

export async function createProductInfo(request: Request, response: Response) {
  const productsInfoRepository = new ProductsInfoRepository();
  const createProductInfoUseCase = new CreateProductInfoUseCase(
    productsInfoRepository
  );

  const {
    code,
    name,
    description,
    group,
    unit,
    price,
    weight,
  }: ICreateProductInfo = request.body;

  const newProductInfo = await createProductInfoUseCase.execute({
    code,
    name,
    description,
    group,
    unit,
    price,
    weight,
  });

  return response.status(201).json({
    message: "Product Info created successfully",
    data: {
      code: newProductInfo.code,
    },
  });
}
