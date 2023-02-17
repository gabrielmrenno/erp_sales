import { Product } from "../../entities/product";
import { IProductsRepository } from "../../repositories/product-repository-interface";

export class ListProductByIdUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(id: string): Promise<Product | null> {
    const product = this.productsRepository.findById(id);

    return product;
  }
}
