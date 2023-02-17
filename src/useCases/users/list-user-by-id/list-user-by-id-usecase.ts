import { User } from "@prisma/client";
import { AppError } from "../../../errors/app-error";
import { IUsersRepository } from "../../../repositories/users-repository-interface";

export class ListUserByIdUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}
