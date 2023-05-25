import { Prisma, ProductInfo } from "@prisma/client";
import { IProductsInfoRepository } from "../products-info-repository-interface";

export class ProductsRepositoryInMemory implements IProductsInfoRepository {
  items: ProductInfo[] = [];

  async create(data: ICreateProductInfo): Promise<ProductInfo> {
    const productInfo: ProductInfo = {
      ...data,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      code: data.code ?? Math.random(),
      price: new Prisma.Decimal(data.price),
      weight: new Prisma.Decimal(data.weight),
    };

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

  async update(
    code: number,
    data: IUpdateProductInfoDTO
  ): Promise<ProductInfo> {
    const product = await this.findByCode(code);
    const index = this.items.findIndex((product) => product.code === code);

    Object.assign(product!, data);

    this.items[index] = product!;

    return product!;
  }

  async updatePrice(code: number, price: number): Promise<ProductInfo> {
    const updatedProduct = await this.findByCode(code);
    const index = this.items.findIndex((product) => product.code === code);

    Object.assign(updatedProduct!, {
      price,
    });

    this.items[index] = updatedProduct!;

    return updatedProduct!;
  }

  async delete(code: number): Promise<void> {
    const index = await this.items.findIndex(
      (product) => product.code === code
    );

    this.items.splice(index, 1);
  }
}
