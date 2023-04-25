import { Request, Response } from "express";
import { CustomersRepository } from "../../../repositories/implementations/customers-repository";
import { ListCustomerByCodeUseCase } from "../../../useCases/customers/list-customer-by-code-usecase";
import { AppError } from "../../../errors/app-error";

export async function listCustomersByCode(
  request: Request,
  response: Response
): Promise<Response> {
  const customersRepository = new CustomersRepository();
  const listCustomersUseCase = new ListCustomerByCodeUseCase(
    customersRepository
  );

  const { code } = request.params;

  const codeParams = Number(code);

  if (isNaN(codeParams)) {
    throw new AppError("Invalid code");
  }

  const customers = await listCustomersUseCase.execute(codeParams);

  return response.json(customers);
}
