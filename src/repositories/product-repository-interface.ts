import { ProductInfo } from "../entities/product-info";

export interface IProductsRepository {
  create(data: ICreateProductInfo): Promise<ProductInfo>;

  findByName(name: string): Promise<ProductInfo | null>;
  findByCode(code: number): Promise<ProductInfo | null>;

  listAvailable(): Promise<ProductInfo[]>;

  update(code: number, data: IUpdateProductInfoDTO): Promise<ProductInfo>;
  updateUnitPrice(code: number, unitPrice: number): Promise<ProductInfo>;

  delete(code: number): Promise<void>;
}
