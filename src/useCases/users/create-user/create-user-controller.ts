import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateUser } from "../../../dtos/user-dtos";
import { CreateUserUseCase } from "./create-user-usecase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const { name, username, password, role }: ICreateUser = request.body;

    await createUserUseCase.execute({ name, username, password, role });

    return response.status(201).send();
  }
}
