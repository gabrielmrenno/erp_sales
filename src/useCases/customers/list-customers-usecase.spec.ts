import { beforeEach, describe, expect, it } from "vitest";
import { ICreateCustomerDTO } from "../../dtos/customer";
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/customers-repository-inmemory";
import { ListCustomersUseCase } from "./list-customers-usecase";
import { Customer } from "../../entities/customer";

let customersRepositoryInMemory: CustomersRepositoryInMemory;
let listCustomersUseCase: ListCustomersUseCase;

describe("", () => {
  beforeEach(() => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory();
    listCustomersUseCase = new ListCustomersUseCase(
      customersRepositoryInMemory
    );
  });

  it("should be able to list customer", async () => {
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

    const customers = await listCustomersUseCase.execute({});

    expect(customers).toHaveLength(2);
  });

  it("should be able to list unavailable customer", async () => {
    //TODO: Implement this test
    const customerData1: Customer = {
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
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
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

    customersRepositoryInMemory.customers.push(customerData1);
    await customersRepositoryInMemory.create(customerData2);

    const customers = await listCustomersUseCase.execute({ active: false });

    expect(customers).toHaveLength(1);
    expect(customers).toEqual([
      expect.objectContaining({ name: "Customer 1" }),
    ]);
  });

  it("should be able to paginate customer's list", async () => {
    for (let i = 1; i <= 22; i++) {
      await customersRepositoryInMemory.create({
        name: `Customer ${i}`,
        email: "test@email.com",
        phone: "123456789",
        address: "Test Address",
        city: "Test City",
        zipCode: "123456",
        contactName: "Test Contact Name",
        discount: 0,
        paymentTerm: 0,
        doc: "132456789",
        fantasyName: `Fantasy Name ${i}`,
        code: i,
      });
    }

    const customers = await listCustomersUseCase.execute({
      page: 2,
    });

    expect(customers).toHaveLength(2);
    expect(customers).toEqual([
      expect.objectContaining({ code: 21 }),
      expect.objectContaining({ code: 22 }),
    ]);
  });

  it("should be able to filter customer's list by fantasyName and doc", async () => {
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

    const customersWithFantasyNameFiltered = await listCustomersUseCase.execute(
      {
        stringQuery: "Test Fantasy Name 2",
      }
    );

    const customersWithDocFiltered = await listCustomersUseCase.execute({
      stringQuery: "2132456789",
    });

    expect(customersWithFantasyNameFiltered).toEqual([
      expect.objectContaining({ fantasyName: "Test Fantasy Name 2" }),
    ]);

    expect(customersWithDocFiltered).toEqual([
      expect.objectContaining({ doc: "2132456789" }),
    ]);
  });

  it("should be able to filter customer's list by doc", async () => {
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

    const customers = await listCustomersUseCase.execute({
      numberQuery: 2,
    });

    expect(customers).toEqual([expect.objectContaining({ code: 2 })]);
  });
});
