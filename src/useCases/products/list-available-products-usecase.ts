import { Product } from "../../entities/product";
import { IProductsRepository } from "../../repositories/product-repository-interface";

export class ListAvailableProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(): Promise<Product[]> {
    const users = await this.productsRepository.listAvailable();

    return users;
  }
}
