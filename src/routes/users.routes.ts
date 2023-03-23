import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { isAdmin } from "../middleware/isAdmin";
import { CreateUserController } from "../useCases/users/create-user/create-user-controller";
import { ListAllUserController } from "../useCases/users/list-all-users/list-all-users-controller";
import { ListUserByIdController } from "../useCases/users/list-user-by-id/list-user-by-id-controller";
import { UpdateUserController } from "../useCases/users/update-user/update-user-controller";
import { UpdatePasswordController } from "../useCases/users/update-password/update-password-controller";
import { ResetPasswordController } from "../useCases/users/reset-password/reset-password-controller";
import { TurnAdminController } from "../useCases/users/turn-admin/turn-admin-controller";
import { DeleteUserController } from "../useCases/users/delete-user/delete-user-controller";

const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUserController();
const listUserById = new ListUserByIdController();
const updateUserController = new UpdateUserController();
const updatePasswordController = new UpdatePasswordController();
const resetPasswordController = new ResetPasswordController();
const turnAdminController = new TurnAdminController();
const deleteUserController = new DeleteUserController();

const userRoutes = Router();

// userRoutes.use(isAuthenticated);

// userRoutes.post("/", isAdmin, createUserController.handle);

userRoutes.post("/", createUserController.handle);

userRoutes.get("/", isAdmin, listAllUsersController.handle);

userRoutes.get("/user/:id", listUserById.handle);

userRoutes.put("/user/:id", isAdmin, updateUserController.handle);

userRoutes.patch("/user/:id/update-password", updatePasswordController.handle);

userRoutes.patch(
  "/user/:id/reset-password",
  isAdmin,
  resetPasswordController.handle
);

userRoutes.patch("/user/:id/turn-admin", turnAdminController.handle);

userRoutes.delete("/user/:id", isAdmin, deleteUserController.handle);

export { userRoutes };
