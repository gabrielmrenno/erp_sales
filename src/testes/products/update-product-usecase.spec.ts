import { beforeAll, describe, it } from "vitest";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { UpdateProductUseCase } from "../../useCases/products/update-user-usecase";

let productsRepository: ProductsRepositoryInMemory;
let updateProductUseCase: UpdateProductUseCase;

describe("", () => {
  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
  });
  it("should be able to update an product", async () => {
    const productData: ICreateProduct = {
      name: "Product 1",
      group: "Group 1",
      unitPrice: 10,
    };

    const product = await productsRepository.create(productData);

    const productUpdated = updateProductUseCase.execute(product.id, {
      name: "Product updated",
      group: "Group updated",
      unitPrice: 20,
    });
  });
});
