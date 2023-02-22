import { beforeAll, describe, expect, it } from "vitest";
import { ICreateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/customers-repository-inmemory";
import { ListCustomerByIdUseCase } from "../../useCases/customers/list-customer-byid-usecase";

let customersRepositoryInMemory: CustomersRepositoryInMemory;
let listCustomerByIdUseCase: ListCustomerByIdUseCase;
let customerCreated: Customer;

describe("List customer by id", () => {
  beforeAll(async () => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
    listCustomerByIdUseCase = new ListCustomerByIdUseCase(
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
    const user = await listCustomerByIdUseCase.execute(customerCreated.id);

    expect(user).toBeInstanceOf(Customer);
  });
});
