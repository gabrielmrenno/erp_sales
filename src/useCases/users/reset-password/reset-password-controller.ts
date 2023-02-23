import { Request, Response } from "express";
import { ResetPasswordUseCase } from "./reset-password-usecase";
import { container } from "tsyringe";

export class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
    const { id } = request.params;

    const user = await resetPasswordUseCase.execute(id);

    return response.json(user);
  }
}
