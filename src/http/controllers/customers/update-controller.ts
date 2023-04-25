import { Request, Response } from "express";
import { CustomersRepository } from "../../../repositories/implementations/customers-repository";
import { UpdateCustomerUseCase } from "../../../useCases/customers/update-customer-usecase";
import { IUpdateCustomerDTO } from "../../../dtos/customer";
import { AppError } from "../../../errors/app-error";

export async function updateCustomer(request: Request, response: Response) {
  const customersRepository = new CustomersRepository();
  const updateCustomerUseCase = new UpdateCustomerUseCase(customersRepository);

  const {
    name,
    address,
    city,
    contactName,
    discount,
    doc,
    email,
    fantasyName,
    paymentTerm,
    phone,
    zipCode,
  }: IUpdateCustomerDTO = request.body;

  const { code } = request.params;

  const codeFormatted = Number(code);

  if (isNaN(codeFormatted)) {
    throw new AppError("Invalid Code");
  }

  const newCustomer = await updateCustomerUseCase.execute({
    code: codeFormatted,
    name,
    address,
    city,
    contactName,
    discount,
    doc,
    email,
    fantasyName,
    paymentTerm,
    phone,
    zipCode,
  });

  return response.status(201).json({
    message: "Customer updated successfully",
    data: {
      code: newCustomer.code,
    },
  });
}
