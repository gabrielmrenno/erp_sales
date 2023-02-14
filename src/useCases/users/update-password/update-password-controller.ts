import { Request, Response } from "express";
import { UsersRepository } from "../../../repositories/implementations/users-repository";
import { UpdatePasswordUseCase } from "./update-password-usecase";

const usersRepository = new UsersRepository();

export class UpdatePasswordController {
  constructor(private updatePasswordUseCase: UpdatePasswordUseCase) {}

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

    const { password } = request.body;

    try {
      const updatedUser = await this.updatePasswordUseCase.execute({
        id,
        password,
      });

      return response.status(200).json(updatedUser);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
