import { Request, Response } from "express";
import { AppError } from "../../../errors/app-error";
import { CustomersRepository } from "../../../repositories/implementations/customers-repository";
import { DeleteCustomerUseCase } from "../../../useCases/customers/delete-customer-usecase";

export async function deleteCustomer(request: Request, response: Response) {
  const customersRepository = new CustomersRepository();
  const deleteCustomerUseCase = new DeleteCustomerUseCase(customersRepository);

  const { code } = request.params;

  const codeFormatted = Number(code);

  if (isNaN(codeFormatted)) {
    throw new AppError("Invalid Code");
  }

  await deleteCustomerUseCase.execute(codeFormatted);

  return response.status(200).json({
    message: "Customer deleted successfully",
    data: {},
  });
}
