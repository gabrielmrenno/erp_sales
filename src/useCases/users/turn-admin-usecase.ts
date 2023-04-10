import { User } from "../../entities/user";
import { AppError } from "../../errors/app-error";
import { IUsersRepository } from "../../repositories/users-repository-interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class TurnAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User does not exist", 404);
    }

    const adminUser = await this.usersRepository.turnAdmin(user.id);

    return adminUser;
  }
}
