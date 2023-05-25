import { Request, Response } from "express";
import { AppError } from "../../../errors/app-error";
import { AuthenticateUseCase } from "../../../useCases/account/authenticate-usecase";
import { UsersRepository } from "../../../repositories/implementations/users-repository";

export class AuthenticateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    const { authorization } = request.headers;

    if (!authorization) {
      // return response.status(403).send("No authorization header");
      throw new AppError("No authorization header", 403);
    }

    const encoded = authorization.replace("Basic ", "");
    const decode = Buffer.from(encoded, "base64").toString("utf-8");
    const [username, password] = decode.split(":");

    const data = await authenticateUseCase.execute({
      username,
      password,
    });

    return response.json(data);
  }
}
