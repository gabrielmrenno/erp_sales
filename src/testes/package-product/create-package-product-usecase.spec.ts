import { beforeAll, describe, expect, it } from "vitest";
import { PackageProduct } from "../../entities/package-product";
import { PackageProductsRepositoryInMemory } from "../../repositories/in-memory/package-products-repository-inmemory";
import { CreatePackageProductUseCase } from "../../useCases/package-products/create-package-products/create-package-products-usecase";

let packageProductsRepository: PackageProductsRepositoryInMemory;
let createPackageProductUseCase: CreatePackageProductUseCase;

describe("Create PackageProduct UseCase", () => {
  beforeAll(() => {
    packageProductsRepository = new PackageProductsRepositoryInMemory();
    createPackageProductUseCase = new CreatePackageProductUseCase(
      packageProductsRepository
    );
  });

  it("should create a packageProduct", async () => {
    const packageProductData: ICreatePackageProduct = {
      description: "PackageProduct 1",
      batch: "Batch 1",
      idProduct: "Product 1",
      idProductionLaunch: "ProductionLaunch 1",
      unit: "FD",
      price: 10,
      weight: 10,
    };

    const packageProduct = await createPackageProductUseCase.execute(
      packageProductData
    );

    expect(packageProduct).toBeInstanceOf(PackageProduct);
    expect(packageProductsRepository.packageProducts).contains(packageProduct);
    expect(packageProduct).toHaveProperty("id");
    expect(packageProduct).toHaveProperty("createdAt");
    expect(packageProduct).toHaveProperty("updatedAt");
    expect(packageProduct).toHaveProperty("deletedAt");
  });

  //   it("should not create a packageProduct with same description", async () => {
  //     const packageProductData: ICreatePackageProduct = {
  //       description: "PackageProduct 1",
  //       batch: "Batch 1",
  //       idProduct: "Product 1",
  //       idProductionLaunch: "ProductionLaunch 1",
  //       unit: "FD",
  //       price: 10,
  //       weight: 10,
  //     };

  //     await expect(
  //       createPackageProductUseCase.execute(packageProductData)
  //     ).rejects.toThrowError("PackageProduct already exists");
  //   });
});
