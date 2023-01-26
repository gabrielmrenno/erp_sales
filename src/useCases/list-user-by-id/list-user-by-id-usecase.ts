import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/implementations/users-repository";

export class ListUserByIdUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}