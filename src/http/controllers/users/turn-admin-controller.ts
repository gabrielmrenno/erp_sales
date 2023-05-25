import { Request, Response } from "express";
import { TurnAdminUseCase } from "../../../useCases/users/turn-admin-usecase";
import { UsersRepository } from "../../../repositories/implementations/users-repository";

export async function turnAdmin(
  request: Request,
  response: Response
): Promise<Response> {
  const usersRepository = new UsersRepository();
  const turnAdminUseCase = new TurnAdminUseCase(usersRepository);

  const { id } = request.params;

  const user = await turnAdminUseCase.execute(id);

  return response.status(200).json({
    message: "User turned admin successfully",
    data: {
      id: user.id,
    },
  });
}
