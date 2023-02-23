import { User } from "@prisma/client";
import { IUsersRepository } from "../../../repositories/users-repository-interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAllActive();

    return users;
  }
}
