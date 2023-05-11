import { Prisma, ProductionLaunch } from "@prisma/client";

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

export interface IProductionLaunchesRepository {
  create(
    data: Prisma.ProductionLaunchCreateManyInput
  ): Promise<ProductionLaunch>;

  list(): Promise<ProductionLaunch[]>;
  getById(id: string): Promise<ProductionLaunch | null>;

  update(data: UpdateProductionLaunchUseCaseParams): Promise<ProductionLaunch>;
}
