import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError, StatusCode } from "../../errors/app-error";
import { IUsersRepository } from "../../repositories/users-repository-interface";

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  idUser: string;
  role: string;
  resetPassword: boolean;
  token: string;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByUniqueValues({ username });

    if (!user) {
      throw new AppError("Invalid Credentials");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Invalid Credentials");
    }

    if (process.env.JWT_SECRET === undefined) {
      throw new AppError(
        "JWT_SECRET is undefined",
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
    const token = sign({}, process.env.JWT_SECRET!, {
      subject: user.id,
      expiresIn: "1d",
    });

    const data: IResponse = {
      idUser: user.id,
      role: user.role,
      resetPassword: user.resetPassword,
      token,
    };

    return data;
  }
}
