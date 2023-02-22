import { Customer } from "../../entities/customer";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";

export class ListCustomerByIdUseCase {
  constructor(private customerRepository: ICustomersRepository) {}

  async execute(id: string): Promise<Customer> {
    const user = await this.customerRepository.findById(id);

    return user;
  }
}
