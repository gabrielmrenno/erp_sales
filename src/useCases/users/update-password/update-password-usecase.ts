import { hash } from "bcrypt";
import { User } from "../../../entities/user";
import { IUsersRepository } from "../../../repositories/users-repository-interface";

interface IRequest {
  id: string;
  password: string;
}

export class UpdatePasswordUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ id, password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await hash(password, 8);

    const updatedUser = await this.usersRepository.updatePassword(
      id,
      hashedPassword
    );

    return updatedUser;
  }
}
