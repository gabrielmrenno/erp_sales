import { Request, Response } from "express";
import { DeleteUserUseCase } from "./delete-user-usecase";
import { container } from "tsyringe";

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    const user = await deleteUserUseCase.execute(id);

    return response.status(200).json({
      message: "User deleted successfully",
      data: {
        id: user.id,
      },
    });
  }
}
