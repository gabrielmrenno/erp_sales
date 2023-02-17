import { Product } from "../../entities/product";
import { IProductsRepository } from "../../repositories/product-repository-interface";

export class UpdateProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(id: string, data: IUpdateProductDTO): Promise<Product> {
    const updatedProduct = this.productsRepository.update(id, data);

    return updatedProduct;
  }
}
