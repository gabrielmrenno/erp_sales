import { Prisma, ProductionLaunch } from "@prisma/client";

export interface IProductionLaunchesRepository {
  create(
    data: Prisma.ProductionLaunchCreateManyInput
  ): Promise<ProductionLaunch>;
}
