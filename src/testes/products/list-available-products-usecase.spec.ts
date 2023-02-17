import { beforeAll, describe, expect, it } from "vitest";
import { Product } from "../../entities/product";
import { User } from "../../entities/user";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { ListAvailableProductsUseCase } from "../../useCases/products/list-available-products-usecase";

let productsRepository: ProductsRepositoryInMemory;
let listAvailableProductsUseCase: ListAvailableProductsUseCase;

describe("List Available Products UseCase", () => {
  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    listAvailableProductsUseCase = new ListAvailableProductsUseCase(
      productsRepository
    );
  });
  it("should list all available products", async () => {
    const user1 = new Product({
      name: "Product 1",
      group: "Group 1",
      unitPrice: 10,
    });

    productsRepository.products.push(user1);

    const user2 = new Product({
      name: "Product 2",
      group: "Group 2",
      unitPrice: 20,
    });

    productsRepository.products.push(user2);

    const users = await listAvailableProductsUseCase.execute();

    expect(users).toBeInstanceOf(Array<Product>);
    expect(users.length).toBe(2);
  });
});
