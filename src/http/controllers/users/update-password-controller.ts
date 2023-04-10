import { Request, Response } from "express";
import { UsersRepository } from "../../../repositories/implementations/users-repository";
import { UpdatePasswordUseCase } from "../../../useCases/users/update-password-usecase";
import { container } from "tsyringe";
import { AppError } from "../../../errors/app-error";

export async function updatePassword(
  request: Request,
  response: Response
): Promise<Response> {
  const usersRepository = new UsersRepository();
  const updatePasswordUseCase = new UpdatePasswordUseCase(usersRepository);

  const { id } = request.params;
  const { id: authenticateUser } = request.user!;

  // user is not authorized to update another user's password
  if (authenticateUser !== id) {
    throw new AppError("User is not authorized", 401);
  }

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
