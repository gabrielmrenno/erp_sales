import { beforeAll, describe, expect, it } from "vitest";
import { ProductInfo } from "../../entities/product-info";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { ListAvailableProductsInfoUseCase } from "./list-available-products-usecase";

let productsRepository: ProductsRepositoryInMemory;
let listAvailableProductsInfoUseCase: ListAvailableProductsInfoUseCase;

describe("List Available Products UseCase", () => {
  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    listAvailableProductsInfoUseCase = new ListAvailableProductsInfoUseCase(
      productsRepository
    );
  });
  it("should list all available products", async () => {
    const product1 = new ProductInfo({
      name: "Product 1",
      description: "Description 1",
      group: "Group 1",
      unit: "FD",
      weight: 10,
      price: 10,
      code: 1,
    });

    productsRepository.items.push(product1);

    const product2 = new ProductInfo({
      name: "Product 2",
      description: "Description 2",
      group: "Group 2",
      unit: "FD",
      weight: 20,
      price: 20,
      code: 2,
    });

    productsRepository.items.push(product2);

    const products = await listAvailableProductsInfoUseCase.execute();

    expect(products).toBeInstanceOf(Array<ProductInfo>);
    expect(products.length).toBe(2);
  });
});
