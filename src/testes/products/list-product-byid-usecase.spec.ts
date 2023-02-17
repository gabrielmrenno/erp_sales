import { beforeAll, describe, expect, it } from "vitest";
import { Product } from "../../entities/product";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { ListProductByIdUseCase } from "../../useCases/products/create-product-byid-usecase";

let productsRepository: ProductsRepositoryInMemory;
let listProductByIdUseCase: ListProductByIdUseCase;

describe("List Product By ID UseCase", () => {
  beforeAll(() => {
    productsRepository = new ProductsRepositoryInMemory();
    listProductByIdUseCase = new ListProductByIdUseCase(productsRepository);
  });
  it("should list a product by id", async () => {
    const product1 = new Product({
      name: "Product 1",
      group: "Group 1",
      unitPrice: 10,
    });
  });
});
