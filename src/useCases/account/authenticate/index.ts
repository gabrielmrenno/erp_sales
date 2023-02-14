import { UsersRepository } from "../../../repositories/implementations/users-repository";
import { AuthenticateController } from "./authenticate-controller";
import { AuthenticateUseCase } from "./authenticate-usecase";

export default (): AuthenticateController => {
  const usersRepository = new UsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);
  const authenticateController = new AuthenticateController(
    authenticateUseCase
  );

  return authenticateController;
};
