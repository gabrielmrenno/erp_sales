import { Product } from "../../entities/product";
import { AppError } from "../../errors/app-error";
import { IProductsRepository } from "../../repositories/product-repository-interface";

export class ListProductByIdUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(id: string): Promise<Product | null> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }
}
