import { Customer } from "../../entities/customer";
import { AppError } from "../../errors/app-error";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";

export class ListCustomerByCodeUseCase {
  constructor(private customersRepository: ICustomersRepository) {}

  async execute(code: number): Promise<Customer> {
    const user = await this.customersRepository.findByCode(code);

    if (!user) {
      throw new AppError("Customer not found", 404);
    }

    return user;
  }
}
