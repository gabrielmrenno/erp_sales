import { ListCustomersParams } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";

export class ListCustomersUseCase {
  constructor(private customersRepository: ICustomersRepository) {}

  async execute({
    active,
    page,
    stringQuery,
    numberQuery,
  }: ListCustomersParams): Promise<Customer[]> {
    const customers = await this.customersRepository.list({
      active,
      page,
      stringQuery,
      numberQuery,
    });

    return customers;
  }
}
