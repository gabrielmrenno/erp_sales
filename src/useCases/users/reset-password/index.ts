import { UsersRepository } from "../../../repositories/implementations/users-repository";
import { ResetPasswordController } from "./reset-password-controller";
import { ResetPasswordUseCase } from "./reset-password-usecase";

export default (): ResetPasswordController => {
  const usersRepository = new UsersRepository();
  const resetPasswordUseCase = new ResetPasswordUseCase(usersRepository);
  const resetPasswordController = new ResetPasswordController(
    resetPasswordUseCase
  );

  return resetPasswordController;
};
