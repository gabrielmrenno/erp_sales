import { ICreateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";

export class CreateCustomerUseCase {
  constructor(private customersRepository: ICustomersRepository) {}

  execute(data: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.customersRepository.create(data);

    return customer;
  }
}
