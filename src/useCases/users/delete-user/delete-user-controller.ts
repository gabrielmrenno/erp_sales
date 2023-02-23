import { Request, Response } from "express";
import { DeleteUserUseCase } from "./delete-user-usecase";
import { container } from "tsyringe";

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    try {
      const user = await deleteUserUseCase.execute(id);

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({
        message: error || "Unexpected error.",
      });
    }
  }
}
