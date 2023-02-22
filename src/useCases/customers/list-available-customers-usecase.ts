import { Customer } from "../../entities/customer";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";

export class ListAvailableCustomersUseCase {
  constructor(private customersRepository: ICustomersRepository) {}

  async execute(): Promise<Customer[]> {
    const customers = await this.customersRepository.listAvailable();

    return customers;
  }
}
