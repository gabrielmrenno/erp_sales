import { IFindUserByUniqueValues, IUpdateUser } from "../../dtos/user-dtos";
import { User } from "../../entities/user";
import { IUsersRepository } from "../users-repository-interface";

export class userRepositoryInMemory implements IUsersRepository {
    private users: User[] = [];

    public async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async findByUniqueValues({ username, name }: IFindUserByUniqueValues): Promise<User | null> {
        const user = this.users.find(user => user.username === username || user.name === name);

        return user || null;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id);

        return user || null;
    }

    async update(id: string, data: IUpdateUser): Promise<User> {
        const user = await this.findById(id);
        const index = await this.users.findIndex(user => user?.id === id);

        if (!user) {
            throw new Error('User not found');
        }

        const updatedUser = Object.assign(user, data);
        this.users[index] = updatedUser;

        return this.users[index];
    }
}