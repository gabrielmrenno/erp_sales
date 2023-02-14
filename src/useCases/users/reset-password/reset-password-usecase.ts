import { User } from "@prisma/client";
import { IUsersRepository } from "../../../repositories/users-repository-interface";

export class ResetPasswordUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const resetPasswordUser = await this.usersRepository.resetPassword(user.id);

    return resetPasswordUser;
  }
}
