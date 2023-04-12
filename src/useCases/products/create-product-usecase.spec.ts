import { beforeAll, describe, expect, it } from "vitest";
import { ProductInfo } from "../../entities/product-info";
import { AppError } from "../../errors/app-error";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { CreateProductUseCase } from "./create-product-usecase";

let productsRepository: ProductsRepositoryInMemory;
let createProductUseCase: CreateProductUseCase;

describe("Create PackageProduct UseCase", () => {
  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    createProductUseCase = new CreateProductUseCase(productsRepository);
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

    const product = await createProductUseCase.execute(productData);

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
      createProductUseCase.execute(productData)
    ).rejects.toBeInstanceOf(AppError);
  });
});
