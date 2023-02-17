import { PackageProduct } from "../../entities/package-product";
import { IPackageProductRepository } from "../package-products-repository-interface";

export class PackageProductsRepositoryInMemory
  implements IPackageProductRepository
{
  public packageProducts: PackageProduct[] = [];

  async create(data: ICreatePackageProduct): Promise<PackageProduct> {
    const packageProduct = new PackageProduct(data);

    Object.assign(packageProduct, {
      created_at: new Date(),
    });

    this.packageProducts.push(packageProduct);

    return packageProduct;
  }

  async findByDescription(description: string): Promise<PackageProduct | null> {
    const packageProduct = this.packageProducts.find(
      (packageProduct) => packageProduct.description === description
    );

    if (!packageProduct) {
      return null;
    }

    return packageProduct;
  }
}
