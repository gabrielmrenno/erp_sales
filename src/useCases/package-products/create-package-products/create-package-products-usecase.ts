import { PackageProduct } from "../../../entities/package-product";
import { IPackageProductRepository } from "../../../repositories/package-products-repository-interface";

export class CreatePackageProductUseCase {
  constructor(private packageProductsRepository: IPackageProductRepository) {}

  async execute(data: ICreatePackageProduct): Promise<PackageProduct> {
    const packageProduct = await this.packageProductsRepository.create(data);

    return packageProduct;
  }
}
