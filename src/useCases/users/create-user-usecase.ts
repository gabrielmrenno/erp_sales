import { randomUUID } from "crypto";
import { User } from "../../entities/user";
import { IUsersRepository } from "../../repositories/users-repository-interface";
import { ICreateUser } from "../../dtos/user-dtos";
import { hash } from "bcrypt";
import { AppError } from "../../errors/app-error";

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(newUser: ICreateUser): Promise<User> {
    const { name, username } = newUser;
    // Check if user already exists, username is already in use
    const userAlreadyExists = await this.usersRepository.findByUniqueValues({
      username,
      name,
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const user = new User({
      ...newUser,
      isAdmin: newUser.role === "ADMIN" ? true : false,
      password: await hash("mudar@123", 8),
    });

    await this.usersRepository.save(user);

    return user;
  }
}
