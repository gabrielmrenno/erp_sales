import { Prisma, ProductionLaunch } from "@prisma/client";
import { IProductionLaunchesRepository } from "../production-launches-repository-interface";
import { prisma } from "../../database/prisma-client";

export class ProductionLaunchesRepository
  implements IProductionLaunchesRepository
{
  async create(
    data: Prisma.ProductionLaunchCreateManyInput
  ): Promise<ProductionLaunch> {
    const productionLaunch = await prisma.productionLaunch.create({
      data,
    });

    return productionLaunch;
  }
}
