import { beforeEach, describe, expect, it } from "vitest";
import { ICreateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { AppError } from "../../errors/app-error";
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

  it("should not be able to create an existing customer name", async () => {
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

    const customerData2: ICreateCustomerDTO = {
      name: "Customer 1",
      email: "test2@email.com",
      phone: "2123456789",
      address: "Test Address 2",
      city: "Test City 2",
      zipCode: "2123456",
      contactName: "Test Contact Name 2",
      discount: 0,
      paymentTerm: 0,
      doc: "2132456789",
      fantasyName: "Test Fantasy Name 2",
      code: 2,
    };

    expect(async () => {
      await createCustomerUseCase.execute(customerData);
      await createCustomerUseCase.execute(customerData2);
    }).rejects.toEqual(new AppError("Customer name already exists!"));
  });

  it("should not be able to create an existing customer fantasy name", async () => {
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

    const customerData2: ICreateCustomerDTO = {
      name: "Customer 2",
      email: "test2@email.com",
      phone: "2123456789",
      address: "Test Address 2",
      city: "Test City 2",
      zipCode: "2123456",
      contactName: "Test Contact Name 2",
      discount: 0,
      paymentTerm: 0,
      doc: "2132456789",
      fantasyName: "Test Fantasy Name",
      code: 2,
    };

    expect(async () => {
      await createCustomerUseCase.execute(customerData);
      await createCustomerUseCase.execute(customerData2);
    }).rejects.toEqual(new AppError("Customer fantasy name already exists!"));
  });

  it("should not be able to create an existing customer doc", async () => {
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

    const customerData2: ICreateCustomerDTO = {
      name: "Customer 2",
      email: "test2@email.com",
      phone: "2123456789",
      address: "Test Address 2",
      city: "Test City 2",
      zipCode: "2123456",
      contactName: "Test Contact Name 2",
      discount: 0,
      paymentTerm: 0,
      doc: "132456789",
      fantasyName: "Test Fantasy Name 2",
      code: 2,
    };

    expect(async () => {
      await createCustomerUseCase.execute(customerData);
      await createCustomerUseCase.execute(customerData2);
    }).rejects.toEqual(new AppError("Customer doc already exists!"));
  });
});
