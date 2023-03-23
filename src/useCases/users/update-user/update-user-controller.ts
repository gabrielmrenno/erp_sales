import { Request, Response } from "express";
import { UpdateUserUseCase } from "./update-user-usecase";
import { container } from "tsyringe";

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const { id } = request.params;
    const { name, role } = request.body;

    const updatedUser = await updateUserUseCase.execute(id, {
      name,
      role,
    });

    return response.status(200).json({
      message: "User updated successfully",
      data: {
        id: updatedUser.id,
      },
    });
  }
}
