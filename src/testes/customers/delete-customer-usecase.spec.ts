import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { ICreateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { AppError } from "../../errors/app-error";
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/customers-repository-inmemory";
import { DeleteCustomerUseCase } from "../../useCases/customers/delete-customer-usecase";

let customersRepositoryInMemory: CustomersRepositoryInMemory;
let deleteCustomerUseCase: DeleteCustomerUseCase;
let customer: Customer;

describe("Delete Customer Use Case", () => {
  beforeEach(async () => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
    deleteCustomerUseCase = new DeleteCustomerUseCase(
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

    customer = await customersRepositoryInMemory.create(customerData);
  });
  it("should be able to delete a customer", async () => {
    await deleteCustomerUseCase.execute(customer.id);

    expect(customersRepositoryInMemory.customers).toHaveLength(0);
  });

  it("should not be able to delete a inexistent customer", () => {
    expect(async () => {
      await deleteCustomerUseCase.execute("invalid_id");
    }).rejects.toEqual(new AppError("Customer not exists", 404));
  });
});
