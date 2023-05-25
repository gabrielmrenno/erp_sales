import { beforeAll, describe, expect, it } from "vitest";
import { AppError } from "../../errors/app-error";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { UpdatePriceProductInfoUseCase } from "./update-price-product-usecase";

let productsRepository: ProductsRepositoryInMemory;
let updatePriceProductInfoUseCase: UpdatePriceProductInfoUseCase;

describe("", () => {
  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    updatePriceProductInfoUseCase = new UpdatePriceProductInfoUseCase(
      productsRepository
    );
  });
  it("should be able to update an product", async () => {
    const product = await productsRepository.create({
      name: "Product 1",
      description: "Description 1",
      group: "Group 1",
      unit: "FD",
      weight: 10,
      price: 10,
      code: 1,
    });

    const updatedProduct = await updatePriceProductInfoUseCase.execute(
      product.code!,
      20
    );

    expect(updatedProduct.price).toBe(20);
  });

  it("should not be able to update an product that does not exist", async () => {
    await expect(updatePriceProductInfoUseCase.execute(0, 20)).rejects.toEqual(
      new AppError("Product not found", 404)
    );
  });
});
