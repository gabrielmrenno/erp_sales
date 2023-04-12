import { User } from "@prisma/client";
import { AppError } from "../../errors/app-error";
import { IUsersRepository } from "../../repositories/users-repository-interface";

export class ResetPasswordUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const resetPasswordUser = await this.usersRepository.resetPassword(user.id);

    return resetPasswordUser;
  }
}
