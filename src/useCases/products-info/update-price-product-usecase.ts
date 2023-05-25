import { ProductInfo } from "../../entities/product-info";
import { AppError } from "../../errors/app-error";
import { IProductsInfoRepository } from "../../repositories/products-info-repository-interface";

export class UpdatePriceProductInfoUseCase {
  constructor(private productsRepository: IProductsInfoRepository) {}

  async execute(code: number, price: number): Promise<ProductInfo> {
    const productExists = await this.productsRepository.findByCode(code);

    if (!productExists) {
      throw new AppError("Product not found", 404);
    }

    // TODO: make an updateMany on price
    const updatedProduct = this.productsRepository.updatePrice(code, price);

    return updatedProduct;
  }
}
