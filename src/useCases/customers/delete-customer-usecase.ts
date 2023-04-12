import { AppError } from "../../errors/app-error";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";

export class DeleteCustomerUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(code: number) {
    const customerExists = await this.customersRepository.findByCode(code);

    if (!customerExists) {
      throw new AppError("Customer not exists", 404);
    }

    await this.customersRepository.delete(code);
  }
}
