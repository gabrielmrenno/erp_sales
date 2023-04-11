import { IUpdateUser } from "../../dtos/user-dtos";
import { User } from "../../entities/user";
import { AppError } from "../../errors/app-error";
import { IUsersRepository } from "../../repositories/users-repository-interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(id: string, data: IUpdateUser): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const nameAlreadyExists = await this.usersRepository.findByName(
      data.name || ""
    );

    if (nameAlreadyExists && nameAlreadyExists.id !== id) {
      throw new AppError("Name already exists");
    }

    const updatedUser = await this.usersRepository.update(id, data);

    return updatedUser;
  }
}
