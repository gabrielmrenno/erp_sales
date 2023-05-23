import { Prisma, Product, ProductInfo } from "@prisma/client";

interface GetProduct {
  productBatch: string;
  productInfoCode: number;
}

interface UpdateProduct {
  id: string;
  amount: number;
}

interface StockGroupByProductInfo extends ProductInfo {
  products: Product[];
  total: number;
}

export interface IProductsRepository {
  create(data: Prisma.ProductCreateManyInput): Promise<Product>;

  get(data: GetProduct): Promise<Product | null>;
  list(): Promise<Product[]>;
  listProductsOnStock(): Promise<Product[]>;

  getOldestProductWithAmount(productInfoCode: number): Promise<Product | null>;
  listProductsGroupedByProductInfo(): Promise<StockGroupByProductInfo[]>;

  // update amount of stock
  updateAmount(data: UpdateProduct): Promise<void>;
}
