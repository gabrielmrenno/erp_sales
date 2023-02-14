import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "../../../repositories/users-repository-interface";

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  idUser: string;
  role: string;
  isAdmin: boolean;
  token: string;
}

export class AuthenticateUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByUniqueValues({ username });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    if (process.env.JWT_SECRET === undefined) {
      throw new Error("JWT_SECRET is undefined");
    }
    const token = sign({}, process.env.JWT_SECRET!, {
      subject: user.id,
      expiresIn: "1d",
    });

    const data = {
      idUser: user.id,
      role: user.role,
      isAdmin: user.isAdmin,
      token,
    };

    return data;
  }
}
