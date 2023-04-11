import { IUpdateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { AppError } from "../../errors/app-error";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";

export class UpdateCustomerUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(newCustomerData: IUpdateCustomerDTO): Promise<Customer> {
    const customerToUpdate = await this.customersRepository.findByCode(
      newCustomerData.code
    );

    if (!customerToUpdate) {
      throw new AppError("Customer not found", 404);
    }

    const nameAlreadyExists = await this.customersRepository.findByName(
      newCustomerData.name
    );

    if (nameAlreadyExists && nameAlreadyExists.code !== newCustomerData.code) {
      throw new AppError("Customer name already exists", 400);
    }

    const fantasyNameAlreadyExists =
      await this.customersRepository.findByFantasyName(
        newCustomerData.fantasyName
      );

    if (
      fantasyNameAlreadyExists &&
      fantasyNameAlreadyExists.code !== newCustomerData.code
    ) {
      throw new AppError("Customer fantasy name already exists", 400);
    }

    const docAlreadyExists = await this.customersRepository.findByDoc(
      newCustomerData.doc
    );

    if (docAlreadyExists && docAlreadyExists.code !== newCustomerData.code) {
      throw new AppError("Customer doc already exists", 400);
    }

    return await this.customersRepository.update(newCustomerData);
  }
}
