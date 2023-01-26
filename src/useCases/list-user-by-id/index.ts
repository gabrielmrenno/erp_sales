import { UsersRepository } from "../../repositories/implementations/users-repository";
import { ListUserByIdController } from "./list-user-by-id-controller";
import { ListUserByIdUseCase } from "./list-user-by-id-usecase";


export default (): ListUserByIdController => {
  const userRepository = new UsersRepository();
  const listUserByIdUseCase = new ListUserByIdUseCase(userRepository);
  const listUserByIdController = new ListUserByIdController(listUserByIdUseCase);

  return listUserByIdController;
}