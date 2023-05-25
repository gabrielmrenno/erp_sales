import { Request, Response } from "express";
import { CustomersRepository } from "../../../repositories/implementations/customers-repository";
import { ListCustomersUseCase } from "../../../useCases/customers/list-customers-usecase";

export async function listCustomers(
  request: Request,
  response: Response
): Promise<Response> {
  const customersRepository = new CustomersRepository();
  const listCustomersUseCase = new ListCustomersUseCase(customersRepository);

  const { active, page, stringQuery, numberQuery } = request.query;

  const booleanActive = active === "false" ? false : true;

  const customers = await listCustomersUseCase.execute({
    active: booleanActive,
    page: Number(page) || 1,
    stringQuery: String(stringQuery),
    numberQuery: Number(numberQuery),
  });

  return response.json(customers);
}
