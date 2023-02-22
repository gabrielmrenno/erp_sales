import { IUpdateCustomerDTO } from "../../dtos/customer";
import { Customer } from "../../entities/customer";
import { AppError } from "../../errors/app-error";
import { ICustomersRepository } from "../../repositories/customers-repository-interface";

export class UpdateCustomerUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(newCustomerData: IUpdateCustomerDTO): Promise<Customer> {
    const customerToUpdate = await this.customersRepository.findById(
      newCustomerData.id
    );

    if (!customerToUpdate) {
      throw new AppError("Customer not found", 404);
    }

    const nameAlreadyExists = await this.customersRepository.findByName(
      newCustomerData.name
    );

    if (nameAlreadyExists && nameAlreadyExists.id !== newCustomerData.id) {
      throw new AppError("Customer name already exists", 400);
    }

    const fantasyNameAlreadyExists =
      await this.customersRepository.findByFantasyName(
        newCustomerData.fantasyName
      );

    console.log(fantasyNameAlreadyExists);

    if (
      fantasyNameAlreadyExists &&
      fantasyNameAlreadyExists.id !== newCustomerData.id
    ) {
      throw new AppError("Customer fantasy name already exists", 400);
    }

    const docAlreadyExists = await this.customersRepository.findByDoc(
      newCustomerData.doc
    );

    if (docAlreadyExists && docAlreadyExists.id !== newCustomerData.id) {
      throw new AppError("Customer doc already exists", 400);
    }

    return await this.customersRepository.update(newCustomerData);
  }
}
