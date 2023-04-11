import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../../useCases/users/delete-user-usecase";
import { container } from "tsyringe";
import { UsersRepository } from "../../../repositories/implementations/users-repository";

export async function deleteUser(
  request: Request,
  response: Response
): Promise<Response> {
  const usersRepository = new UsersRepository();
  const deleteUserUseCase = new DeleteUserUseCase(usersRepository);

  const { id } = request.params;

  const user = await deleteUserUseCase.execute(id);

  return response.status(200).json({
    message: "User deleted successfully",
    data: {
      id: user.id,
    },
  });
}
