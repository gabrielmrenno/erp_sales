import { Product } from "../../entities/product";
import { AppError } from "../../errors/app-error";
import { IProductsRepository } from "../../repositories/product-repository-interface";

export class UpdateProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(id: string, data: IUpdateProductDTO): Promise<Product> {
    const productExists = await this.productsRepository.findById(id);

    if (!productExists) {
      throw new AppError("Product not found", 404);
    }

    const updatedProduct = this.productsRepository.update(id, data);

    return updatedProduct;
  }
}
