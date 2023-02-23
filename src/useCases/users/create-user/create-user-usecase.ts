import { randomUUID } from "crypto";
import { User } from "../../../entities/user";
import { IUsersRepository } from "../../../repositories/users-repository-interface";
import { ICreateUser } from "../../../dtos/user-dtos";
import { hash } from "bcrypt";
import { AppError } from "../../../errors/app-error";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute(newUser: ICreateUser): Promise<User> {
    const { name, username } = newUser;
    // Check if user already exists, username is already in use
    const userAlreadyExists = await this.userRepository.findByUniqueValues({
      username,
      name,
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const user = new User({
      ...newUser,
      password: await hash("mudar@123", 8),
    });

    await this.userRepository.save(user);

    return user;
  }
}
