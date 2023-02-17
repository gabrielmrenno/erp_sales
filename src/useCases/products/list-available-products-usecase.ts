import { Product } from "../../entities/product";
import { IProductsRepository } from "../../repositories/product-repository-interface";

export class ListAvailableProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.productsRepository.listAvailable();

    return products;
  }
}