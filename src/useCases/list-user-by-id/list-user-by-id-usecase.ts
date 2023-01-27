import { User } from "@prisma/client";
import { IUsersRepository } from "../../repositories/users-repository-interface";

export class ListUserByIdUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}