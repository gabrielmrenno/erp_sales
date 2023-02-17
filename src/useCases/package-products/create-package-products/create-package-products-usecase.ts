import { PackageProduct } from "../../../entities/package-product";
import { AppError } from "../../../errors/app-error";
import { IPackageProductRepository } from "../../../repositories/package-products-repository-interface";

export class CreatePackageProductUseCase {
  constructor(private packageProductsRepository: IPackageProductRepository) {}

  async execute(data: ICreatePackageProduct): Promise<PackageProduct> {
    const packageProductAlreadyExists =
      await this.packageProductsRepository.findByDescription(data.description);

    if (packageProductAlreadyExists) {
      throw new AppError("PackageProduct already exists");
    }

    const packageProduct = await this.packageProductsRepository.create(data);

    return packageProduct;
  }
}
