import { User } from "@prisma/client";
import { IUsersRepository } from "../../../repositories/users-repository-interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(active?: boolean): Promise<User[]> {
    const users = await this.usersRepository.findAll(active);

    return users;
  }
}
