import { ProductInfo } from "../../entities/product-info";
import { AppError } from "../../errors/app-error";
import { IProductsRepository } from "../../repositories/product-repository-interface";

export class UpdateUnitPriceProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(code: number, unitPrice: number): Promise<ProductInfo> {
    const productExists = await this.productsRepository.findByCode(code);

    if (!productExists) {
      throw new AppError("Product not found", 404);
    }

    const updatedProduct = this.productsRepository.updateUnitPrice(
      code,
      unitPrice
    );

    return updatedProduct;
  }
}
