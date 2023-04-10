import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../../useCases/users/update-user-usecase";
import { AppError } from "../../../errors/app-error";
import { UsersRepository } from "../../../repositories/implementations/users-repository";

export async function updateUser(
  request: Request,
  response: Response
): Promise<Response> {
  const usersRepository = new UsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(usersRepository);

  const { id } = request.params;
  const { name, role } = request.body;
  const { id: authenticatedUserId } = request.user!;

  const authenticatedUser = await usersRepository.findById(authenticatedUserId);

  if (authenticatedUser?.isAdmin) {
    const updateUser = await usersRepository.update(id, {
      name,
      role,
    });
    return response.status(200).json({
      message: "User updated successfully",
      data: {
        id: updateUser.id,
      },
    });
  }

  if (authenticatedUserId !== id) {
    throw new AppError("User is not authorized", 401);
  }

  const updatedUser = await updateUserUseCase.execute(id, {
    name,
  });

  return response.status(200).json({
    message: "User updated successfully",
    data: {
      id: updatedUser.id,
    },
  });
}
