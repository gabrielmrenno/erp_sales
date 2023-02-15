import { Request, Response } from "express";
import { AppError } from "../../../errors/app-error";
import { UsersRepository } from "../../../repositories/implementations/users-repository";
import { ListUserByIdUseCase } from "./list-user-by-id-usecase";

const usersRepository = new UsersRepository();

export class ListUserByIdController {
  constructor(private listUserByIdUseCase: ListUserByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: authenticateUser } = request.user!;

    if (authenticateUser !== id) {
      try {
        const user = await usersRepository.findById(authenticateUser);
        if (!user?.isAdmin) {
          throw new AppError("User isn't authenticate", 401);
        }
      } catch (error) {
        throw new AppError("Error on find user.");
      }
    }

    const user = await this.listUserByIdUseCase.execute(id);

    return response.status(200).json(user);
  }
}
