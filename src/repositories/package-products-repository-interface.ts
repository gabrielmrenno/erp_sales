import { PackageProduct } from "../entities/package-product";

export interface IPackageProductRepository {
  create(data: ICreatePackageProduct): Promise<PackageProduct>;
  findByDescription(description: string): Promise<PackageProduct | null>;
}