import { ProductInfo } from "@prisma/client";

export interface IProductsInfoRepository {
  create(data: ICreateProductInfo): Promise<ProductInfo>;

  findByName(name: string): Promise<ProductInfo | null>;
  findByCode(code: number): Promise<ProductInfo | null>;

  listAvailable(): Promise<ProductInfo[]>;

  update(code: number, data: IUpdateProductInfoDTO): Promise<ProductInfo>;
  updatePrice(code: number, price: number): Promise<ProductInfo>;

  delete(code: number): Promise<void>;
}
