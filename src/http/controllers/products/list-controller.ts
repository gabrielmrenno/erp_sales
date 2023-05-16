import { Request, Response } from "express";
import { ProductsRepository } from "../../../repositories/implementations/products-repository";
import { ListProductsUseCase } from "../../../useCases/products/list-use-case";

export async function listProducts(request: Request, response: Response) {
  const productsRepository = new ProductsRepository();
  const listProductsUseCase = new ListProductsUseCase(productsRepository);

  const products = await listProductsUseCase.execute();

  return response.status(200).json(products);
}
