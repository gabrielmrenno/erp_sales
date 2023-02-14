import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user-usecase";
import { ICreateUser } from "../../../dtos/user-dtos";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async handle(request: Request, response: Response) {
    const { name, username, password, role }: ICreateUser = request.body;

    await this.createUserUseCase.execute({ name, username, password, role });

    return response.status(201).send();
  }
}
