import { beforeAll, describe, expect, it } from "vitest";
import { ICreateCustomerDTO } from "../../dtos/customer";
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/customers-repository-inmemory";
import { ListAvailableCustomersUseCase } from "../../useCases/customers/list-available-customers-usecase";

let customersRepositoryInMemory: CustomersRepositoryInMemory;
let listAvailableCustomersUseCase: ListAvailableCustomersUseCase;

describe("", () => {
  beforeAll(() => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
    listAvailableCustomersUseCase = new ListAvailableCustomersUseCase(
      customersRepositoryInMemory
    );
  });
  it("should be able to list all available customer", async () => {
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
      fantasyName: "Test Fantasy Name 2",
      code: 2,
    };
    await customersRepositoryInMemory.create(customerData);
    await customersRepositoryInMemory.create(customerData2);
    const customers = await listAvailableCustomersUseCase.execute();

    expect(customers).toHaveLength(2);
  });

  it("should not list unavailable customer", async () => {
    //TODO: Implement this test
    // const customerData: ICreateCustomerDTO = {
    //   name: "Customer 1",
    //   email: "test@email.com",
    //   phone: "123456789",
    //   address: "Test Address",
    //   city: "Test City",
    //   zipCode: "123456",
    //   contactName: "Test Contact Name",
    //   discount: 0,
    //   paymentTerm: 0,
    //   doc: "132456789",
    //   fantasyName: "Test Fantasy Name",
    //   code: 1,
    // };
    // const customers = await listAvailableCustomersUseCase.execute();
    // expect(customers).toHaveLength(2);
  });
});
