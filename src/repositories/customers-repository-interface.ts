import { ICreateCustomerDTO } from "../dtos/customer";
import { Customer } from "../entities/customer";

export interface ICustomersRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;

  findById(id: string): Promise<Customer | null>;
  findByName(name: string): Promise<Customer | null>;
  findByFantasyName(fantasyName: string): Promise<Customer | null>;
  findByDoc(doc: string): Promise<Customer | null>;
  findByCode(code: number): Promise<Customer | null>;

  listAvailable(): Promise<Customer[]>;

  update(newCustomerData: ICreateCustomerDTO): Promise<Customer>;
}
