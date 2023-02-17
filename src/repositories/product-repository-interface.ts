import { Product } from "../entities/product";

export interface IProductsRepository {
  create(data: ICreateProduct): Promise<Product>;

  findByName(name: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;

  listAvailable(): Promise<Product[]>;

  update(id: string, data: IUpdateProductDTO): Promise<Product>;
  updateUnitPrice(id: string, unitPrice: number): Promise<Product>;

  delete(id: string): Promise<void>;
}
