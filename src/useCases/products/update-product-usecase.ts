import { ProductInfo } from "../../entities/product-info";
import { AppError } from "../../errors/app-error";
import { IProductsInfoRepository } from "../../repositories/product-repository-interface";

export class UpdateProductUseCase {
  constructor(private productsRepository: IProductsInfoRepository) {}

  async execute(
    code: number,
    data: IUpdateProductInfoDTO
  ): Promise<ProductInfo> {
    const productExists = await this.productsRepository.findByCode(code);

    if (!productExists) {
      throw new AppError("Product not found", 404);
    }

    const updatedProduct = this.productsRepository.update(code, data);

    return updatedProduct;
  }
}
