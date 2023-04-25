import { ProductInfo } from "../../entities/product-info";
import { AppError } from "../../errors/app-error";
import { IProductsInfoRepository } from "../../repositories/product-repository-interface";

export class ListProductInfoByCodeUseCase {
  constructor(private productsRepository: IProductsInfoRepository) {}

  async execute(code: number): Promise<ProductInfo | null> {
    const product = await this.productsRepository.findByCode(code);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }
}
