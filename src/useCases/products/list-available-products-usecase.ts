import { ProductInfo } from "../../entities/product-info";
import { IProductsRepository } from "../../repositories/product-repository-interface";

export class ListAvailableProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(): Promise<ProductInfo[]> {
    const products = await this.productsRepository.listAvailable();

    return products;
  }
}
