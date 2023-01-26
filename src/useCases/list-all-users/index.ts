import { UsersRepository } from "../../repositories/implementations/users-repository";
import { ListAllUserController } from "./list-all-users-controller";
import { ListAllUsersUseCase } from "./list-all-users-usecase";


export default (): ListAllUserController => {
    const userRepository = new UsersRepository();
    const listaAllUsersUseCase = new ListAllUsersUseCase(userRepository);
    const listAllUsersController = new ListAllUserController(listaAllUsersUseCase);
    return listAllUsersController;
}