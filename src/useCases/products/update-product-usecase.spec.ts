import { beforeAll, describe, expect, it } from "vitest";
import { AppError } from "../../errors/app-error";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { UpdateProductUseCase } from "./update-user-usecase";

let productsRepository: ProductsRepositoryInMemory;
let updateProductUseCase: UpdateProductUseCase;

describe("", () => {
  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    updateProductUseCase = new UpdateProductUseCase(productsRepository);
  });
  it("should be able to update an product", async () => {
    const productData: ICreateProduct = {
      name: "Product 1",
      group: "Group 1",
      unitPrice: 10,
    };

    const product = await productsRepository.create(productData);

    const productUpdated = await updateProductUseCase.execute(product.id, {
      name: "Product updated",
      group: "Group updated",
      unitPrice: 20,
    });

    expect(productUpdated.name).toBe("Product updated");
    expect(productUpdated.group).toBe("Group updated");
    expect(productUpdated.unitPrice).toBe(20);
  });

  it("should not be able to update an product that does not exist", async () => {
    await expect(
      updateProductUseCase.execute("123", {
        name: "Product updated",
        group: "Group updated",
        unitPrice: 20,
      })
    ).rejects.toEqual(new AppError("Product not found", 404));
  });
});
