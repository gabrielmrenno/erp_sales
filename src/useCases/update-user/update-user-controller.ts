import { Request, Response } from "express";
import { UpdateUserUseCase } from "./update-user-usecase";

export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, role } = request.body;

    try {
      const updatedUser = await this.updateUserUseCase.execute(id, {
        name,
        role,
      });

      return response.status(200).json(updatedUser);
    } catch (error) {
      return response.status(400).json({
        message: error || "Unexpected error",
      });
    }
  }
}
