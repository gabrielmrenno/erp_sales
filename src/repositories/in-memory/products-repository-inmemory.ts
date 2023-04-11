import { ProductInfo } from "../../entities/product-info";
import { IProductsRepository } from "../product-repository-interface";

export class ProductsRepositoryInMemory implements IProductsRepository {
  items: ProductInfo[] = [];

  async create(data: ICreateProductInfo): Promise<ProductInfo> {
    const productInfo = new ProductInfo(data);

    Object.assign(productInfo, {
      createdAt: new Date(),
    });

    this.items.push(productInfo);

    return productInfo;
  }

  async findByName(name: string): Promise<ProductInfo | null> {
    const productInfo = this.items.find(
      (productInfo) => productInfo.name === name
    );
    if (!productInfo) {
      return null;
    }
    return productInfo;
  }

  async findByCode(code: number): Promise<ProductInfo | null> {
    const productInfo = this.items.find(
      (productInfo) => productInfo.code === code
    );
    if (!productInfo) {
      return null;
    }
    return productInfo;
  }

  async listAvailable(): Promise<ProductInfo[]> {
    const products = await this.items.filter((item) => item.active === true);

    return products;
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

  async delete(id: string): Promise<void> {
    const index = await this.products.findIndex((product) => product.id === id);

    this.products.splice(index, 1);
  }
}
