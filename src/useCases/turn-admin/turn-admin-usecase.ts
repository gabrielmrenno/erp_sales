import { User } from "../../entities/user";
import { IUsersRepository } from "../../repositories/users-repository-interface";

export class TurnAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error("User does not exist");
    }

    const adminUser = await this.usersRepository.turnAdmin(user.id);

    return adminUser;
  }
}
