import { Request, Response } from "express";
import { ResetPasswordUseCase } from "./reset-password-usecase";

export class ResetPasswordController {
  constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const user = await this.resetPasswordUseCase.execute(id);

    return response.json(user);
  }
}
