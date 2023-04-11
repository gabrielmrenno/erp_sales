import { ProductInfo } from "../entities/product-info";

export interface IProductsRepository {
  create(data: ICreateProductInfo): Promise<ProductInfo>;

  findByName(name: string): Promise<ProductInfo | null>;
  findByCode(code: number): Promise<ProductInfo | null>;

  listAvailable(): Promise<ProductInfo[]>;

  update(id: string, data: IUpdateProductInfoDTO): Promise<ProductInfo>;
  updateUnitPrice(id: string, unitPrice: number): Promise<ProductInfo>;

  delete(id: string): Promise<void>;
}
