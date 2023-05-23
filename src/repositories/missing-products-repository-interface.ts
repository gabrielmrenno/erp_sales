import { MissingProducts, Prisma } from "@prisma/client";

export interface IMissingProductsRepository {
  create(data: MissingProducts): Promise<MissingProducts>;
  list(): Promise<MissingProducts[]>;
  deleteMany(orderId: number): Promise<void>;
}
