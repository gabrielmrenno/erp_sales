import { AppError } from "../../errors/app-error";
import { IProductsRepository } from "../../repositories/product-repository-interface";

export class DeleteProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(code: number): Promise<void> {
    const productExists = await this.productsRepository.findByCode(code);

    if (!productExists) {
      throw new AppError("Product not found", 404);
    }

    await this.productsRepository.delete(code);
  }
}
