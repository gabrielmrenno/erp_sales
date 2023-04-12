import { beforeAll, describe, expect, it } from "vitest";
import { ProductInfo } from "../../entities/product-info";
import { AppError } from "../../errors/app-error";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { ListProductByCodeUseCase } from "./list-product-by-code-usecase";

let productsRepository: ProductsRepositoryInMemory;
let listProductByCodeUseCase: ListProductByCodeUseCase;

describe("List Product By Code UseCase", () => {
  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    listProductByCodeUseCase = new ListProductByCodeUseCase(productsRepository);
  });
  it("should list a product by code", async () => {
    const product1 = new ProductInfo({
      name: "Product 1",
      description: "Description 1",
      group: "Group 1",
      unit: "FD",
      weight: 10,
      unitPrice: 10,
      code: 1,
    });

    productsRepository.create(product1);

    const selectedProduct = await listProductByCodeUseCase.execute(1);

    expect(selectedProduct?.code).toEqual(1);
  });

  it("should throw an error if product not found", async () => {
    expect(listProductByCodeUseCase.execute(0)).rejects.toEqual(
      new AppError("Product not found", 404)
    );
  });
});
