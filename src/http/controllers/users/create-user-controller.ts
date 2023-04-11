import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateUser } from "../../../dtos/user-dtos";
import { CreateUserUseCase } from "../../../useCases/users/create-user-usecase";
import { UsersRepository } from "../../../repositories/implementations/users-repository";

export async function createUser(request: Request, response: Response) {
  const usersRepository = new UsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  const { name, username, password, role }: ICreateUser = request.body;

  const newUser = await createUserUseCase.execute({
    name,
    username,
    password,
    role,
  });

  return response.status(201).json({
    message: "User created successfully",
    data: {
      id: newUser.id,
    },
  });
}
