import { beforeAll, describe, expect, it } from "vitest";
import { Product } from "../../entities/product";
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
    const productData: ICreateProduct = {
      name: "Product 1",
      group: "Group 1",
      unitPrice: 10,
    };

    const product = await createProductUseCase.execute(productData);

    expect(product).toBeInstanceOf(Product);
    expect(product.name).toBe(productData.name);
    expect(product.group).toBe(productData.group);
    expect(product.unitPrice).toBe(productData.unitPrice);
    expect(product.active).toBe(true);
  });

  it("should not create a product with the same name", async () => {
    const productData: ICreateProduct = {
      name: "Product 1",
      group: "Group 1",
      unitPrice: 10,
    };

    await expect(
      createProductUseCase.execute(productData)
    ).rejects.toBeInstanceOf(AppError);
  });
});
