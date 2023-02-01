import { randomUUID } from "crypto";
import { User } from "../../entities/user";
import { IUsersRepository } from "../../repositories/users-repository-interface";
import { ICreateUser } from "../../dtos/user-dtos";
import { hash } from "bcrypt";

export class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(newUser: ICreateUser): Promise<User> {
    const { name, username } = newUser;
    // Check if user already exists, username is already in use
    const userAlreadyExists = await this.userRepository.findByUniqueValues({
      username,
      name,
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User({
      ...newUser,
      password: await hash("mudar@123", 8),
    });

    await this.userRepository.save(user);

    return user;
  }
}
