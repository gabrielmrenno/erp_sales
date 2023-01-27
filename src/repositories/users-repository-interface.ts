import { IFindUserByUniqueValues, IUpdateUser } from "../dtos/user-dtos";
import { User } from "../entities/user";

export interface IUsersRepository {
    save(user: User): Promise<void>;

    findByUniqueValues({ name, username }: IFindUserByUniqueValues): Promise<User | null>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;

    update(id: string, data: IUpdateUser): Promise<User>;
}