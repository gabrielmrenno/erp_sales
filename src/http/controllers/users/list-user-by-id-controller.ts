import { Request, Response } from "express";
import { AppError } from "../../../errors/app-error";
import { UsersRepository } from "../../../repositories/implementations/users-repository";
import { ListUserByIdUseCase } from "../../../useCases/users/list-user-by-id-usecase";

const usersRepository = new UsersRepository();

export async function listUserById(
  request: Request,
  response: Response
): Promise<Response> {
  const usersRepository = new UsersRepository();
  const listUserByIdUseCase = new ListUserByIdUseCase(usersRepository);

  const { id } = request.params;
  const { id: authenticateUser } = request.user!;

  if (authenticateUser !== id) {
    const user = await usersRepository.findById(authenticateUser);
    if (!user?.isAdmin) {
      throw new AppError("User is not authorized", 401);
    }
  }

  const user = await listUserByIdUseCase.execute(id);

  return response.status(200).json(user);
}
