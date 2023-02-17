import { Product } from "../entities/product";

export interface IProductsRepository {
  create(data: ICreateProduct): Promise<Product>;

  findByName(name: string): Promise<Product | null>;
}
