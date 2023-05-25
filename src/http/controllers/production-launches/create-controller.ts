import { Request, Response } from "express";
import { ProductsInfoRepository } from "../../../repositories/implementations/products-info-repository";
import { ProductionLaunchesRepository } from "../../../repositories/implementations/production-launches-repository";
import { CreateProductionLaunchUseCase } from "../../../useCases/production-launch/create-use-case";
import { ProductsRepository } from "../../../repositories/implementations/products-repository";

interface CreateProductionLaunchUseCaseRequest {
  batch: string;
  date: Date;
  startHour: string;
  endHour: string;
  rawMaterial: string;
  rawMaterialBatch: string;
  description: string;
  productInfoCode: number;
  amount: number;
}

export async function createProductionLaunch(
  request: Request,
  response: Response
) {
  const productsInfoRepository = new ProductsInfoRepository();
  const productsRepository = new ProductsRepository();
  const productionLaunchesRepository = new ProductionLaunchesRepository();

  const createProductionLaunchUseCase = new CreateProductionLaunchUseCase(
    productsRepository,
    productionLaunchesRepository,
    productsInfoRepository
  );

  const {
    batch,
    amount,
    date,
    description,
    endHour,
    productInfoCode,
    rawMaterial,
    rawMaterialBatch,
    startHour,
  }: CreateProductionLaunchUseCaseRequest = request.body;

  const [startHours, startMinutes] = startHour.split(":");
  const dateStartLaunch = new Date(date);
  dateStartLaunch.setHours(Number(startHours));
  dateStartLaunch.setMinutes(Number(startMinutes));

  const [endHours, endMinutes] = endHour.split(":");
  const dateEndLaunch = new Date(date);
  dateEndLaunch.setHours(Number(endHours));
  dateEndLaunch.setMinutes(Number(endMinutes));

  const responseData = await createProductionLaunchUseCase.execute({
    batch,
    amount,
    date,
    description,
    endHour: dateEndLaunch,
    productInfoCode,
    rawMaterial,
    rawMaterialBatch,
    startHour: dateStartLaunch,
  });

  return response.status(201).json({
    message: "Production launch created successfully",
    data: {
      id: responseData.id,
    },
  });
}
