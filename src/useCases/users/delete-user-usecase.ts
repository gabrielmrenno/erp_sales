import { User } from "../../entities/user";
import { AppError } from "../../errors/app-error";
import { IUsersRepository } from "../../repositories/users-repository-interface";

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const deletedUser = await this.usersRepository.deleteUser(id);

    return deletedUser;
  }
}
