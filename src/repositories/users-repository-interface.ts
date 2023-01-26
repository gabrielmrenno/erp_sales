import { User } from "../entities/user";

export interface IUsersRepository {
    save(user: User): Promise<void>;

    findByUsername(username: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
}