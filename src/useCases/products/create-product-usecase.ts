import { Product } from "../../entities/product";
import { AppError } from "../../errors/app-error";
import { IProductsRepository } from "../../repositories/product-repository-interface";

export class CreateProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(data: ICreateProduct): Promise<Product> {
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
