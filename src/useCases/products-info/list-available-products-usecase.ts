import { ProductInfo } from "@prisma/client";
import { IProductsInfoRepository } from "../../repositories/products-info-repository-interface";

export class ListAvailableProductsInfoUseCase {
  constructor(private productsRepository: IProductsInfoRepository) {}

  async execute(): Promise<ProductInfo[]> {
    const products = await this.productsRepository.listAvailable();

    return products;
  }
}
