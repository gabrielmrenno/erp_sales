import { AppError } from "../../errors/app-error";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";

export class DeleteCustomerUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(id: string) {
    const customerExists = await this.customersRepository.findById(id);

    if (!customerExists) {
      throw new AppError("Customer not exists", 404);
    }

    await this.customersRepository.delete(id);
  }
}
