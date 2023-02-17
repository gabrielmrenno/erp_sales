import { beforeAll, describe, expect, it } from "vitest";
import { Product } from "../../entities/product";
import { AppError } from "../../errors/app-error";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";
import { ListProductByIdUseCase } from "../../useCases/products/list-product-byid-usecase";

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

  it("should throw an error if product not found", async () => {
    expect(listProductByIdUseCase.execute("invalid_id")).rejects.toEqual(
      new AppError("Product not found")
    );
  });
});
