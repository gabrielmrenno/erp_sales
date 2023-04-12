import { User } from "@prisma/client";
import { IUsersRepository } from "../../repositories/users-repository-interface";

export class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(active?: boolean): Promise<User[]> {
    const users = await this.usersRepository.findAll(active);

    return users;
  }
}
