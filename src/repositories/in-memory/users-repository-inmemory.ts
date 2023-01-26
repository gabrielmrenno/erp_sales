import { User } from "../../entities/user";
import { IUsersRepository } from "../users-repository-interface";

export class userRepositoryInMemory implements IUsersRepository {
    private users: User[] = [];

    public async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = this.users.find(user => user.username === username);

        return user || null;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id);

        return user || null;
    }
}