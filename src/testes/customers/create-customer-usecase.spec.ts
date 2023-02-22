import { beforeEach, describe, expect, it } from "vitest";
import { ICreateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/customers-repository-inmemory";
import { CreateCustomerUseCase } from "../../useCases/customers/create-customer-usecase";

let customersRepository: CustomersRepositoryInMemory;
let createCustomerUseCase: CreateCustomerUseCase;

describe("Create New Customer UseCase", () => {
  beforeEach(() => {
    customersRepository = new CustomersRepositoryInMemory();
    createCustomerUseCase = new CreateCustomerUseCase(customersRepository);
  });
  it("should be able create a new customer", async () => {
    const customerData: ICreateCustomerDTO = {
      name: "Customer 1",
      email: "test@email.com",
      phone: "123456789",
      address: "Test Address",
      city: "Test City",
      zipCode: "123456",
      contactName: "Test Contact Name",
      discount: 0,
      paymentTerm: 0,
      doc: "132456789",
      fantasyName: "Test Fantasy Name",
      code: 1,
    };

    const customer = await createCustomerUseCase.execute(customerData);

    expect(customer).toBeInstanceOf(Customer);
  });
});
