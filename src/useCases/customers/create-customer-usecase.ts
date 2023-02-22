import { ICreateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { AppError } from "../../errors/app-error";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";

export class CreateCustomerUseCase {
  constructor(private customersRepository: ICustomersRepository) {}

  async execute(data: ICreateCustomerDTO): Promise<Customer> {
    const nameAlreadyExists = await this.customersRepository.findByName(
      data.name
    );

    if (nameAlreadyExists) {
      throw new AppError("Customer name already exists!");
    }

    const fantasyNameAlreadyExists =
      await this.customersRepository.findByFantasyName(data.fantasyName);

    if (fantasyNameAlreadyExists) {
      throw new AppError("Customer fantasy name already exists!");
    }

    const docAlreadyExists = await this.customersRepository.findByDoc(data.doc);

    if (docAlreadyExists) {
      throw new AppError("Customer doc already exists!");
    }

    if (data.code) {
      const codeAlreadyExists = await this.customersRepository.findByCode(
        data.code
      );

      if (codeAlreadyExists) {
        throw new AppError("Customer code already exists!");
      }
    }

    const customer = this.customersRepository.create(data);

    return customer;
  }
}
