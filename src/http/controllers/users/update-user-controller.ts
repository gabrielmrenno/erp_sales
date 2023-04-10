import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../../useCases/users/update-user-usecase";
import { container } from "tsyringe";
import { AppError } from "../../../errors/app-error";
import { UsersRepository } from "../../../repositories/implementations/users-repository";

const usersRepository = new UsersRepository();

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const { id } = request.params;
    const { name, role } = request.body;
    const { id: authenticatedUserId } = request.user!;

    const authenticatedUser = await usersRepository.findById(
      authenticatedUserId
    );

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
}
