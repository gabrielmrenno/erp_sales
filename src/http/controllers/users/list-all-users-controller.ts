import { User } from "@prisma/client";
import { ListAllUsersUseCase } from "../../../useCases/users/list-all-users-usecase";
import { Request, Response } from "express";
import { UsersRepository } from "../../../repositories/implementations/users-repository";

export async function listAllUsers(
  request: Request,
  response: Response
): Promise<Response> {
  const usersRepository = new UsersRepository();
  const listAllUsersUseCase = new ListAllUsersUseCase(usersRepository);

  const { active } = request.query;

  const booleanActive = active === "false" ? false : true;

  const users = await listAllUsersUseCase.execute(booleanActive);

  return response.json(users);
}
