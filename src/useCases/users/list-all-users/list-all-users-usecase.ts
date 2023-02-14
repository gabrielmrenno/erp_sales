import { User } from "@prisma/client";
import { IUsersRepository } from "../../../repositories/users-repository-interface";

export class ListAllUsersUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAllActive();

    return users;
  }
}
