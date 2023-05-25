import { MissingProducts, Order, Prisma, ProductInfo } from "@prisma/client";

export interface IListMissingProductsByProductInfoCod extends MissingProducts {
  order: Order;
}

export interface IMissingProductsRepository {
  create(data: MissingProducts): Promise<MissingProducts>;
  list(): Promise<MissingProducts[]>;

  listByProductInfoCode(
    productInfoCode: number
  ): Promise<IListMissingProductsByProductInfoCod[]>;

  deleteMany(orderId: number): Promise<void>;
  delete({
    orderId,
    productInfoCode,
  }: Prisma.MissingProductsOrderIdProductInfoCodeCompoundUniqueInput): Promise<void>;
}
