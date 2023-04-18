import { Request, Response } from "express";
import { ICreateCustomerDTO } from "../../../dtos/customer";
import { CustomersRepository } from "../../../repositories/implementations/customers-repository";
import { CreateCustomerUseCase } from "../../../useCases/customers/create-customer-usecase";

export async function createCustomer(request: Request, response: Response) {
  const customersRepository = new CustomersRepository();
  const createCustomerUseCase = new CreateCustomerUseCase(customersRepository);

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
  }: ICreateCustomerDTO = request.body;

  const newCustomer = await createCustomerUseCase.execute({
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
    message: "Customer created successfully",
    data: {
      code: newCustomer.code,
    },
  });
}
