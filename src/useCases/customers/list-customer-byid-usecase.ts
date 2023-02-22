import { Customer } from "../../entities/customer";
import { AppError } from "../../errors/app-error";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";

export class ListCustomerByIdUseCase {
  constructor(private customerRepository: ICustomersRepository) {}

  async execute(id: string): Promise<Customer> {
    const user = await this.customerRepository.findById(id);

    if (!user) {
      throw new AppError("Customer not found", 404);
    }

    return user;
  }
}
