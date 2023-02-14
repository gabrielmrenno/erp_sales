import { UsersRepository } from "../../../repositories/implementations/users-repository";
import { UpdateUserController } from "./update-user-controller";
import { UpdateUserUseCase } from "./update-user-usecase";

export default (): UpdateUserController => {
  const userRepository = new UsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(userRepository);
  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
};
