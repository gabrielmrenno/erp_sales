import { ProductInfo } from "../../entities/product-info";
import { IProductsInfoRepository } from "../../repositories/product-repository-interface";

export class ListAvailableProductsUseCase {
  constructor(private productsRepository: IProductsInfoRepository) {}

  async execute(): Promise<ProductInfo[]> {
    const products = await this.productsRepository.listAvailable();

    return products;
  }
}
