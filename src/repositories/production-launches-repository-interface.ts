import { Prisma, ProductionLaunch } from "@prisma/client";

export interface ProductionLaunchesRepository {
  create(
    data: Prisma.ProductionLaunchCreateManyInput
  ): Promise<ProductionLaunch>;
}
