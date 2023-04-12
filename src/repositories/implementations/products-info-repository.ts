import { prisma } from "../../database/prisma-client";
import { ProductInfo } from "../../entities/product-info";
import { IProductsInfoRepository } from "../product-repository-interface";

export class ProductsInfoRepository implements IProductsInfoRepository {
  async create(data: ICreateProductInfo): Promise<ProductInfo> {
    const newProductInfo = new ProductInfo(data);
    await prisma.productInfo.create({
      data: newProductInfo,
    });
  }
  findByName(name: string): Promise<ProductInfo | null> {
    throw new Error("Method not implemented.");
  }
  findByCode(code: number): Promise<ProductInfo | null> {
    throw new Error("Method not implemented.");
  }
  listAvailable(): Promise<ProductInfo[]> {
    throw new Error("Method not implemented.");
  }
  update(code: number, data: IUpdateProductInfoDTO): Promise<ProductInfo> {
    throw new Error("Method not implemented.");
  }
  updateprice(code: number, price: number): Promise<ProductInfo> {
    throw new Error("Method not implemented.");
  }
  delete(code: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
