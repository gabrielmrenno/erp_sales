import { beforeAll, describe, expect, it } from "vitest";
import { ProductInfo } from "../../entities/product-info";
import { AppError } from "../../errors/app-error";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { CreateProductInfoUseCase } from "./create-product-usecase";

let productsRepository: ProductsRepositoryInMemory;
let createProductInfoUseCase: CreateProductInfoUseCase;

describe("Create PackageProduct UseCase", () => {
  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    createProductInfoUseCase = new CreateProductInfoUseCase(productsRepository);
  });
  it("should be able create a packageProduct", async () => {
    const productData: ICreateProductInfo = {
      name: "Product 1",
      description: "Description 1",
      group: "Group 1",
      unit: "FD",
      weight: 10,
      price: 10,
      code: 1,
    };

    const product = await createProductInfoUseCase.execute(productData);

    expect(product).toBeInstanceOf(ProductInfo);
    expect(product).toEqual(
      expect.objectContaining({
        name: "Product 1",
        description: "Description 1",
        group: "Group 1",
        unit: "FD",
        weight: 10,
        price: 10,
        code: 1,
      })
    );
  });

  it("should not create a product with the same name", async () => {
    const productData: ICreateProductInfo = {
      name: "Product 1",
      description: "Description 1",
      group: "Group 1",
      unit: "FD",
      weight: 10,
      price: 10,
      code: 1,
    };

    await expect(
      createProductInfoUseCase.execute(productData)
    ).rejects.toBeInstanceOf(AppError);
  });
});
