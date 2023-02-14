import { UsersRepository } from "../../../repositories/implementations/users-repository";
import { DeleteUserController } from "./delete-user-controller";
import { DeleteUserUseCase } from "./delete-user-usecase";

export default (): DeleteUserController => {
  const usersRepository = new UsersRepository();
  const deleteUserUseCase = new DeleteUserUseCase(usersRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  return deleteUserController;
};
