import { IProductsRepository } from "../../repositories/products-repository-interface";

export class ListProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}
  async execute() {
    const products =
      await this.productsRepository.listProductsGroupedByProductInfo();
    return products;
  }
}
