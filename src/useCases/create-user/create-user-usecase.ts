import { randomUUID } from "crypto";
import { User } from "../../entities/user";
import { IUsersRepository } from "../../repositories/users-repository-interface";
import { ICreateUser } from "../../dtos/user-dtos";
import { hash } from "bcrypt";



export class CreateUserUseCase {
    constructor(private userRepository: IUsersRepository) {}

    async execute(newUser: ICreateUser): Promise<void>{
        // Check if user already exists, username is already in use
        const userAlreadyExists = await this.userRepository.findByUsername(newUser.username);

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

        const user = new User({
            id: randomUUID(),
            ...newUser,
            password: await hash(newUser.password, 10),
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await this.userRepository.save(user);
    }
}