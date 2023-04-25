import { Request, Response } from "express";
import { UsersRepository } from "../../../repositories/implementations/users-repository";
import { UpdatePasswordUseCase } from "../../../useCases/users/update-password-usecase";
import { AppError } from "../../../errors/app-error";

export async function updatePassword(
  request: Request,
  response: Response
): Promise<Response> {
  const usersRepository = new UsersRepository();
  const updatePasswordUseCase = new UpdatePasswordUseCase(usersRepository);

  const { id } = request.user!;

  const { password } = request.body;

  const updatedUser = await updatePasswordUseCase.execute({
    id,
    password,
  });

  return response.status(200).json({
    message: "Password updated successfully",
    data: {
      id: updatedUser.id,
    },
  });
}
