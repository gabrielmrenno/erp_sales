import { ProductInfo } from "@prisma/client";
import { AppError } from "../../errors/app-error";
import { IProductsInfoRepository } from "../../repositories/product-repository-interface";

export class CreateProductInfoUseCase {
  constructor(private productsRepository: IProductsInfoRepository) {}

  async execute(data: ICreateProductInfo): Promise<ProductInfo> {
    const productAlreadyExists = await this.productsRepository.findByName(
      data.name
    );

    if (productAlreadyExists) {
      throw new AppError("Product already exists");
    }

    const product = await this.productsRepository.create(data);

    return product;
  }
}
