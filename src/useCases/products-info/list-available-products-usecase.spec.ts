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
    await productsRepository.create({
      code: 1,
      name: `Produto teste 1`,
      description: `Descição teste 1`,
      group: `Grupo teste 1`,
      price: 10,
      unit: "FD",
      weight: 10,
    });

    await productsRepository.create({
      code: 2,
      name: `Produto teste 2`,
      description: `Descição teste 2`,
      group: `Grupo teste 2`,
      price: 20,
      unit: "FD",
      weight: 20,
    });

    const products = await listAvailableProductsInfoUseCase.execute();

    expect(products).toBeInstanceOf(Array<ProductInfo>);
    expect(products.length).toBe(2);
  });
});
