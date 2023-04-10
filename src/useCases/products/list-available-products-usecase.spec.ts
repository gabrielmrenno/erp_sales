import { beforeAll, describe, expect, it } from "vitest";
import { Product } from "../../entities/product";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { ListAvailableProductsUseCase } from "./list-available-products-usecase";

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
    const product1 = new Product({
      name: "Product 1",
      group: "Group 1",
      unitPrice: 10,
    });

    productsRepository.products.push(product1);

    const product2 = new Product({
      name: "Product 2",
      group: "Group 2",
      unitPrice: 20,
    });

    productsRepository.products.push(product2);

    const products = await listAvailableProductsUseCase.execute();

    expect(products).toBeInstanceOf(Array<Product>);
    expect(products.length).toBe(2);
  });
});
