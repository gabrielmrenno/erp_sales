import { beforeAll, describe, expect, it } from "vitest";
import { ICreateCustomerDTO, IUpdateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/customers-repository-inmemory";
import { UpdateCustomerUseCase } from "../../useCases/customers/update-customer-usecase";

let customersRepositoryInMemory: CustomersRepositoryInMemory;
let updateCustomerUseCase: UpdateCustomerUseCase;
let customer: Customer;

describe("Update Customer Use Case", () => {
  beforeAll(async () => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
    updateCustomerUseCase = new UpdateCustomerUseCase(
      customersRepositoryInMemory
    );

    const customerData: ICreateCustomerDTO = {
      name: "Customer Name",
      fantasyName: "Customer Fantasy Name",
      doc: "12345678900",
      code: 123456,
      address: "Customer Address",
      phone: "12345678900",
      email: "",
      city: "Customer City",
      contactName: "Customer Contact Name",
      discount: 0,
      paymentTerm: 0,
      zipCode: "12345678",
    };

    customer = await customersRepositoryInMemory.create(customerData);
  });
  it("should be able to update a customer", async () => {
    const dataCustomerUpdated: IUpdateCustomerDTO = {
      id: customer.id,
      name: "Customer Name Updated",
      fantasyName: "Customer Fantasy Name Updated",
      doc: "12345678900",
      address: "Customer Address Updated",
      city: "Customer City Updated",
      zipCode: "12345678",
      phone: "12345678900",
      email: "test@email.com",
      contactName: "Customer Contact Name Updated",
      discount: 0,
      paymentTerm: 0,
    };

    const updatedCustomer = await updateCustomerUseCase.execute(
      dataCustomerUpdated
    );

    expect(updatedCustomer.name).toBe(dataCustomerUpdated.name);
    expect(updatedCustomer.fantasyName).toBe(dataCustomerUpdated.fantasyName);
    expect(updatedCustomer.address).toBe(dataCustomerUpdated.address);
    expect(updatedCustomer.city).toBe(dataCustomerUpdated.city);
    expect(updatedCustomer.contactName).toBe(dataCustomerUpdated.contactName);
  });
});
