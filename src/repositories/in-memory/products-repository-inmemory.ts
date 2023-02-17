import { Product } from "../../entities/product";
import { IProductsRepository } from "../product-repository-interface";

export class ProductsRepositoryInMemory implements IProductsRepository {
  products: Product[] = [];

  async create(data: ICreateProduct): Promise<Product> {
    const product = new Product(data);

    Object.assign(product, {
      createdAt: new Date(),
    });

    this.products.push(product);

    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.products.find((product) => product.name === name);
    if (!product) {
      return null;
    }
    return product;
  }

  async listAvailable(): Promise<Product[]> {
    const products = await this.products.filter(
      (product) => product.active === true
    );

    return products;
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      return null;
    }
    return product;
  }

  async update(id: string, data: IUpdateProductDTO): Promise<Product> {
    const product = await this.findById(id);
    const index = this.products.findIndex((product) => product.id === id);

    Object.assign(product!, data);

    this.products[index] = product!;

    return product!;
  }

  async updateUnitPrice(id: string, unitPrice: number): Promise<Product> {
    const updatedProduct = await this.findById(id);
    const index = this.products.findIndex((product) => product.id === id);

    Object.assign(updatedProduct!, {
      unitPrice,
    });

    this.products[index] = updatedProduct!;

    return updatedProduct!;
  }

  delete(id: string): Promise<void> {
    const index = this.products.findIndex((product) => product.id === id);

    this.products.splice(index, 1);

    return Promise.resolve();
  }
}
