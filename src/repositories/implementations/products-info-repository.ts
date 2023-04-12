import { ProductInfo } from "../../entities/product-info";
import { IProductsInfoRepository } from "../product-repository-interface";

export class ProductsInfoRepository implements IProductsInfoRepository {
  create(data: ICreateProductInfo): Promise<ProductInfo> {
    throw new Error("Method not implemented.");
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
  updateUnitPrice(code: number, unitPrice: number): Promise<ProductInfo> {
    throw new Error("Method not implemented.");
  }
  delete(code: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
