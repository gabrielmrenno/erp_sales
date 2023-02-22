import { IUpdateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";

export class UpdateCustomerUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(newCustomerData: IUpdateCustomerDTO): Promise<Customer> {
    return await this.customersRepository.update(newCustomerData);
  }
}
