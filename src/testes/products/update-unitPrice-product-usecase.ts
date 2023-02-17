import { beforeAll, describe, expect, it } from "vitest";
import { AppError } from "../../errors/app-error";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { UpdateUnitPriceProductUseCase } from "../../useCases/products/update-unitPrice-product-usecase";

let productsRepository: ProductsRepositoryInMemory;
let updateUnitPriceProductUseCase: UpdateUnitPriceProductUseCase;

describe("", () => {
  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    updateUnitPriceProductUseCase = new UpdateUnitPriceProductUseCase(
      productsRepository
    );
  });
  it("should be able to update an product", async () => {
    const product = await productsRepository.create({
      name: "Product 1",
      unitPrice: 10,
      group: "Group 1",
    });

    const updatedProduct = await updateUnitPriceProductUseCase.execute(
      product.id,
      20
    );

    expect(updatedProduct.unitPrice).toBe(20);
  });

  it("should not be able to update an product that does not exist", async () => {
    await expect(
      updateUnitPriceProductUseCase.execute("non-existing-id", 20)
    ).rejects.toEqual(new AppError("Product not found", 404));
  });
});
