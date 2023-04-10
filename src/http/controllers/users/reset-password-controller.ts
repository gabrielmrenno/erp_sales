import { Request, Response } from "express";
import { ResetPasswordUseCase } from "../../../useCases/users/reset-password-usecase";
import { container } from "tsyringe";
import { UsersRepository } from "../../../repositories/implementations/users-repository";

export async function resetPassword(
  request: Request,
  response: Response
): Promise<Response> {
  const usersRepository = new UsersRepository();
  const resetPasswordUseCase = new ResetPasswordUseCase(usersRepository);

  const { id } = request.params;

  const user = await resetPasswordUseCase.execute(id);

  return response.json({
    message: "Password reset successfully",
    data: {
      id: user.id,
    },
  });
}
