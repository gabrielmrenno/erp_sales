import { ICreateCustomerDTO, ListCustomersParams } from "../dtos/customer";
import { Customer } from "../entities/customer";

export interface ICustomersRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;

  findByName(name: string): Promise<Customer | null>;
  findByFantasyName(fantasyName: string): Promise<Customer | null>;
  findByDoc(doc: string): Promise<Customer | null>;
  findByCode(code: number): Promise<Customer | null>;

  list(data: ListCustomersParams): Promise<Customer[]>;

  update(newCustomerData: ICreateCustomerDTO): Promise<Customer>;

  delete(code: number): Promise<void>;
}
