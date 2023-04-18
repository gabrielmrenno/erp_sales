import { beforeAll, describe, expect, it } from "vitest";
import { ProductInfo } from "../../entities/product-info";
import { AppError } from "../../errors/app-error";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { ListProductInfoByCodeUseCase } from "./list-product-by-code-usecase";

let productsRepository: ProductsRepositoryInMemory;
let listProductInfoByCodeUseCase: ListProductInfoByCodeUseCase;

describe("List Product By Code UseCase", () => {
  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    listProductInfoByCodeUseCase = new ListProductInfoByCodeUseCase(
      productsRepository
    );
  });
  it("should list a product by code", async () => {
    const product1 = new ProductInfo({
      name: "Product 1",
      description: "Description 1",
      group: "Group 1",
      unit: "FD",
      weight: 10,
      price: 10,
      code: 1,
    });

    productsRepository.create(product1);

    const selectedProduct = await listProductInfoByCodeUseCase.execute(1);

    expect(selectedProduct?.code).toEqual(1);
  });

  it("should throw an error if product not found", async () => {
    expect(listProductInfoByCodeUseCase.execute(0)).rejects.toEqual(
      new AppError("Product not found", 404)
    );
  });
});
