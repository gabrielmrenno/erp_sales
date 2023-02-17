import { Product } from "../../entities/product";
import { AppError } from "../../errors/app-error";
import { IProductsRepository } from "../../repositories/product-repository-interface";

export class UpdateUnitPriceProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(id: string, unitPrice: number): Promise<Product> {
    const productExists = await this.productsRepository.findById(id);

    if (!productExists) {
      throw new AppError("Product not found", 404);
    }

    const updatedProduct = this.productsRepository.updateUnitPrice(
      id,
      unitPrice
    );

    return updatedProduct;
  }
}
