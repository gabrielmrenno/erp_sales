import { container } from "tsyringe";
import { UsersRepository } from "../../repositories/implementations/users-repository";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/users-repository-inmemory";
import { IUsersRepository } from "../../repositories/users-repository-interface";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  process.env.NODE_ENV !== "test" ? UsersRepositoryInMemory : UsersRepository
);
