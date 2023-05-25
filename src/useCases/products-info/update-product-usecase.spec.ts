import { beforeAll, describe, expect, it } from "vitest";
import { AppError } from "../../errors/app-error";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { UpdateProductInfoUseCase } from "./update-product-usecase";

let productsRepository: ProductsRepositoryInMemory;
let updateProductInfoUseCase: UpdateProductInfoUseCase;

describe("", () => {
  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    updateProductInfoUseCase = new UpdateProductInfoUseCase(productsRepository);
  });
  it("should be able to update an product", async () => {
    const productData: ICreateProductInfo = {
      name: "Product 1",
      description: "Description 1",
      group: "Group 1",
      unit: "FD",
      weight: 10,
      price: 10,
      code: 1,
    };

    const product = await productsRepository.create(productData);

    const productUpdated = await updateProductInfoUseCase.execute(
      product.code!,
      {
        name: "Product updated",
        group: "Group updated",
        price: 20,
        description: "Description updated",
        unit: "SC",
        weight: 20,
      }
    );

    expect(productUpdated).toEqual(
      expect.objectContaining({
        name: "Product updated",
        group: "Group updated",
        price: 20,
        description: "Description updated",
        unit: "SC",
        weight: 20,
      })
    );
  });

  it("should not be able to update an product that does not exist", async () => {
    await expect(
      updateProductInfoUseCase.execute(123, {
        name: "Product updated",
        group: "Group updated",
        price: 20,
        description: "Description updated",
        unit: "SC",
        weight: 20,
      })
    ).rejects.toEqual(new AppError("Product not found", 404));
  });
});
