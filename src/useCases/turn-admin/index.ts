import { UsersRepository } from "../../repositories/implementations/users-repository";
import { TurnAdminController } from "./turn-admin-controller";
import { TurnAdminUseCase } from "./turn-admin-usecase";

export default (): TurnAdminController => {
  const usersRepository = new UsersRepository();
  const turnAdminUseCase = new TurnAdminUseCase(usersRepository);
  const turnAdminController = new TurnAdminController(turnAdminUseCase);

  return turnAdminController;
};
