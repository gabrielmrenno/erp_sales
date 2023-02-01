import { Request, Response } from "express";
import { UpdatePasswordUseCase } from "./update-password-usecase";

export class UpdatePasswordController {
  constructor(private updatePasswordUseCase: UpdatePasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
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
