import { beforeAll, describe, expect, it } from "vitest";
import { AppError } from "../../errors/app-error";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { DeleteProductUseCase } from "./delete-product-usecase";

let productsRepository: ProductsRepositoryInMemory;
let deleteProductUseCase: DeleteProductUseCase;

describe("DeleteProductUseCase", () => {
  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    deleteProductUseCase = new DeleteProductUseCase(productsRepository);
  });
  it("should be able to delete an product", async () => {
    const product = await productsRepository.create({
      name: "Product 1",
      description: "Description 1",
      group: "Group 1",
      unit: "FD",
      weight: 10,
      unitPrice: 10,
      code: 1,
    });

    await deleteProductUseCase.execute(product.code!);

    expect(productsRepository.items).not.toContainEqual(product);
    expect(productsRepository.items.length).toBe(0);
  });

  it("should not be able to delete an product that does not exist", async () => {
    await expect(deleteProductUseCase.execute(0)).rejects.toEqual(
      new AppError("Product not found", 404)
    );
  });
});
