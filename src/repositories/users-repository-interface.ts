import { IFindUserByUniqueValues, IUpdateUser } from "../dtos/user-dtos";
import { User } from "../entities/user";

export interface IUsersRepository {
  save(user: User): Promise<void>;

  findByUniqueValues({
    name,
    username,
  }: IFindUserByUniqueValues): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
  findAll(active?: boolean): Promise<User[]>;
  findById(id: string): Promise<User | null>;

  update(id: string, data: IUpdateUser): Promise<User>;
  updatePassword(id: string, password: string): Promise<User>;
  resetPassword(id: string): Promise<User>;
  turnAdmin(id: string): Promise<User>;

  deleteUser(id: string): Promise<User>;
}
