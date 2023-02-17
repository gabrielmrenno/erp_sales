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
}
