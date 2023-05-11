import { Prisma, ProductionLaunch } from "@prisma/client";
import { IProductionLaunchesRepository } from "../production-launches-repository-interface";
import { prisma } from "../../database/prisma-client";

interface UpdateProductionLaunchUseCaseParams {
  id: string;
  batch?: string;
  date?: Date | string;
  startHour?: Date | string;
  endHour?: Date | string;
  rawMaterial?: string;
  rawMaterialBatch?: string;
  description?: string;
  productInfoCode?: number;
  amount?: number;
}

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

  async list(): Promise<ProductionLaunch[]> {
    const productionLaunches = await prisma.productionLaunch.findMany();

    return productionLaunches;
  }

  async getById(id: string): Promise<ProductionLaunch | null> {
    const productionLaunch = await prisma.productionLaunch.findUnique({
      where: {
        id,
      },
    });

    return productionLaunch;
  }

  async update(
    data: UpdateProductionLaunchUseCaseParams
  ): Promise<ProductionLaunch> {
    const productionLaunched = await prisma.productionLaunch.update({
      where: {
        id: data.id,
      },
      data,
    });

    return productionLaunched;
  }
}
