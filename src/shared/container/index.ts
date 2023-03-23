import { container } from "tsyringe";

import { UsersRepository } from "../../repositories/implementations/users-repository";
import { IUsersRepository } from "../../repositories/users-repository-interface";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
