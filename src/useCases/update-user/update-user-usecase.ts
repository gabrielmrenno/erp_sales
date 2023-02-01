import { IUpdateUser } from "../../dtos/user-dtos";
import { User } from "../../entities/user";
import { IUsersRepository } from "../../repositories/users-repository-interface";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUsersRepository) {}

  async execute(id: string, data: IUpdateUser): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const nameAlreadyExists = await this.userRepository.findByName(
      data.name || ""
    );

    const users = await this.userRepository.findAllActive();

    if (nameAlreadyExists && nameAlreadyExists.id !== id) {
      throw new Error("Name already exists");
    }

    const updatedUser = await this.userRepository.update(id, data);

    return updatedUser;
  }
}
