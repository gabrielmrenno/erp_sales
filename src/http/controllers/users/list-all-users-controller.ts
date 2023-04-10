import { User } from "@prisma/client";
import { ListAllUsersUseCase } from "../../../useCases/users/list-all-users-usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListAllUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { active } = request.query;

    const booleanActive = active === "true" ? true : false;

    const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);
    const users = await listAllUsersUseCase.execute(booleanActive);

    return response.json(users);
  }
}
