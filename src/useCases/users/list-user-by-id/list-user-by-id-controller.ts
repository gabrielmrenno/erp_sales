import { Request, Response } from "express";
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
          return response.status(401).json({ error: "User is not authorized" });
        }
      } catch (error) {
        return response.status(400).json({
          message: error.message || "Unexpected error.",
        });
      }
    }

    try {
      const user = await this.listUserByIdUseCase.execute(id);

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
