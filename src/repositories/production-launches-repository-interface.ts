import { Prisma, ProductionLaunch } from "@prisma/client";

export interface IProductionLaunchesRepository {
  create(
    data: Prisma.ProductionLaunchCreateManyInput
  ): Promise<ProductionLaunch>;

  list(): Promise<ProductionLaunch[]>;
  getById(id: string): Promise<ProductionLaunch | null>;
}
