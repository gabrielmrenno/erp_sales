import { AppError } from "../../errors/app-error";
import { IProductsRepository } from "../../repositories/product-repository-interface";

export class DeleteProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(id: string): Promise<void> {
    const productExists = await this.productsRepository.findById(id);

    if (!productExists) {
      throw new AppError("Product not found", 404);
    }

    await this.productsRepository.delete(id);
  }
}
