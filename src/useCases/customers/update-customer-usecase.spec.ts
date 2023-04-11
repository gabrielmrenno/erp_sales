import { beforeEach, describe, expect, it } from "vitest";
import { ICreateCustomerDTO, IUpdateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { AppError } from "../../errors/app-error";
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/customers-repository-inmemory";
import { UpdateCustomerUseCase } from "./update-customer-usecase";

let customersRepositoryInMemory: CustomersRepositoryInMemory;
let updateCustomerUseCase: UpdateCustomerUseCase;
let customer: Customer;
let customer2: Customer;

describe("Update Customer Use Case", () => {
  beforeEach(async () => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
    updateCustomerUseCase = new UpdateCustomerUseCase(
      customersRepositoryInMemory
    );

    const customerData: ICreateCustomerDTO = {
      name: "Customer Name",
      fantasyName: "Customer Fantasy Name",
      doc: "12345678900",
      code: 1,
      address: "Customer Address",
      phone: "12345678900",
      email: "",
      city: "Customer City",
      contactName: "Customer Contact Name",
      discount: 0,
      paymentTerm: 0,
      zipCode: "12345678",
    };

    const customerData2: ICreateCustomerDTO = {
      name: "Customer Name2",
      fantasyName: "Customer Fantasy Name2",
      doc: "212345678900",
      code: 2,
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
    customer2 = await customersRepositoryInMemory.create(customerData2);
  });
  it("should be able to update a customer", async () => {
    const dataCustomerUpdated: IUpdateCustomerDTO = {
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
      code: 1,
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

  it("should not be able to update an customer that does not exist", async () => {
    const dataCustomerUpdated: IUpdateCustomerDTO = {
      name: "Non existent Customer Name",
      fantasyName: "Non existent Customer Fantasy Name",
      doc: "Non existent 12345678900",
      address: "Non existent Customer Address",
      city: "Non existent Customer City",
      zipCode: "Non existent 12345678",
      phone: "Non existent 12345678900",
      email: "Non existent test@email.com",
      contactName: "Non existent Customer Contact Name",
      discount: 0,
      paymentTerm: 0,
      code: 0,
    };

    expect(async () => {
      await updateCustomerUseCase.execute(dataCustomerUpdated);
    }).rejects.toEqual(new AppError("Customer not found", 404));
  });

  it("should not be able to update an customer with an existing name", async () => {
    const dataCustomerUpdated: IUpdateCustomerDTO = {
      name: "Customer Name2",
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
      code: 1,
    };

    expect(async () => {
      await updateCustomerUseCase.execute(dataCustomerUpdated);
    }).rejects.toEqual(new AppError("Customer name already exists", 400));
  });

  it("should not be able to update an customer with an existing fantasy name", async () => {
    const dataCustomerUpdated: IUpdateCustomerDTO = {
      name: "Customer Name",
      fantasyName: "Customer Fantasy Name2",
      doc: "12345678900",
      address: "Customer Address Updated",
      city: "Customer City Updated",
      zipCode: "12345678",
      phone: "12345678900",
      email: "test@email.com",
      contactName: "Customer Contact Name Updated",
      discount: 0,
      paymentTerm: 0,
      code: 1,
    };

    expect(async () => {
      await updateCustomerUseCase.execute(dataCustomerUpdated);
    }).rejects.toEqual(
      new AppError("Customer fantasy name already exists", 400)
    );
  });

  it("should not be able to update an customer with an existing doc", async () => {
    const dataCustomerUpdated: IUpdateCustomerDTO = {
      name: "Customer Name",
      fantasyName: "Customer Fantasy Name",
      doc: "212345678900",
      address: "Customer Address Updated",
      city: "Customer City Updated",
      zipCode: "12345678",
      phone: "12345678900",
      email: "test@email.com",
      contactName: "Customer Contact Name Updated",
      discount: 0,
      paymentTerm: 0,
      code: 1,
    };

    expect(async () => {
      await updateCustomerUseCase.execute(dataCustomerUpdated);
    }).rejects.toEqual(new AppError("Customer doc already exists", 400));
  });
});
