import { UsersRepository } from "../../../repositories/implementations/users-repository";
import { UpdatePasswordController } from "./update-password-controller";
import { UpdatePasswordUseCase } from "./update-password-usecase";

export default (): UpdatePasswordController => {
  const usersRepository = new UsersRepository();
  const updatePasswrodUseCase = new UpdatePasswordUseCase(usersRepository);
  const updatePasswordController = new UpdatePasswordController(
    updatePasswrodUseCase
  );

  return updatePasswordController;
};
