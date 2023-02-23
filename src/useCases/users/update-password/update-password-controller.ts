import { Request, Response } from "express";
import { UsersRepository } from "../../../repositories/implementations/users-repository";
import { UpdatePasswordUseCase } from "./update-password-usecase";
import { container } from "tsyringe";

const usersRepository = new UsersRepository();

export class UpdatePasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updatePasswordUseCase = container.resolve(UpdatePasswordUseCase);

    const { id } = request.params;
    const { id: authenticateUser } = request.user!;

    if (authenticateUser !== id) {
      const user = await usersRepository.findById(authenticateUser);
      if (!user?.isAdmin) {
        return response.status(401).json({ error: "User is not authorized" });
      }
    }

    const { password } = request.body;

    const updatedUser = await updatePasswordUseCase.execute({
      id,
      password,
    });

    return response.status(200).json(updatedUser);
  }
}
