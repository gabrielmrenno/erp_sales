import { Request, Response } from "express";
import { UsersRepository } from "../../../repositories/implementations/users-repository";
import { UpdatePasswordUseCase } from "../../../useCases/users/update-password-usecase";
import { container } from "tsyringe";
import { AppError } from "../../../errors/app-error";

const usersRepository = new UsersRepository();

export class UpdatePasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updatePasswordUseCase = container.resolve(UpdatePasswordUseCase);

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
}
