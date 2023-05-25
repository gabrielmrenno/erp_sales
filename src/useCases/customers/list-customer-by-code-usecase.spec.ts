import { beforeAll, describe, expect, it } from "vitest";
import { ICreateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { AppError } from "../../errors/app-error";
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/customers-repository-inmemory";
import { ListCustomerByCodeUseCase } from "./list-customer-by-code-usecase";

let customersRepositoryInMemory: CustomersRepositoryInMemory;
let listCustomerCodeIdUseCase: ListCustomerByCodeUseCase;
let customerCreated: Customer;

describe("List customer by code", () => {
  beforeAll(async () => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
    listCustomerCodeIdUseCase = new ListCustomerByCodeUseCase(
      customersRepositoryInMemory
    );

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

    customerCreated = await customersRepositoryInMemory.create(customerData);
  });
  it("should be able to list customer by id", async () => {
    const user = await listCustomerCodeIdUseCase.execute(customerCreated.code!);

    expect(user).toBeInstanceOf(Customer);
  });

  it("should not be able to list customer by id if id doesn't exist", async () => {
    expect(async () => {
      await listCustomerCodeIdUseCase.execute(0);
    }).rejects.toEqual(new AppError("Customer not found", 404));
  });
});
