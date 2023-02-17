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
    const users = await this.products.filter(
      (product) => product.active === true
    );

    return users;
  }
}
