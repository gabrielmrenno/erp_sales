import { Router } from "express";

import { isAuthenticated } from "../../middleware/isAuthenticated";
import { isAdmin } from "../../middleware/isAdmin";
import { validRequest } from "../../middleware";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  getUsersSchema,
  resetPasswordSchema,
  turnAdminSchema,
  updateUserPasswordSchema,
  updateUserSchema,
} from "../../middleware/schemas/userSchema";

import { CreateUserController } from "../controllers/users/create-user-controller";
import { ListAllUserController } from "../controllers/users/list-all-users-controller";
import { ListUserByIdController } from "../controllers/users/list-user-by-id-controller";
import { UpdateUserController } from "../controllers/users/update-user-controller";
import { UpdatePasswordController } from "../controllers/users/update-password-controller";
import { ResetPasswordController } from "../controllers/users/reset-password-controller";
import { TurnAdminController } from "../controllers/users/turn-admin-controller";
import { DeleteUserController } from "../controllers/users/delete-user-controller";

const createUserController = new CreateUserController();
const listAllUsersController = new ListAllUserController();
const listUserById = new ListUserByIdController();
const updateUserController = new UpdateUserController();
const updatePasswordController = new UpdatePasswordController();
const resetPasswordController = new ResetPasswordController();
const turnAdminController = new TurnAdminController();
const deleteUserController = new DeleteUserController();

const userRoutes = Router();

userRoutes.use(isAuthenticated);

userRoutes.post(
  "/",
  createUserSchema,
  validRequest,
  isAdmin,
  createUserController.handle
);

userRoutes.get(
  "/",
  isAdmin,
  getUsersSchema,
  validRequest,
  listAllUsersController.handle
);

userRoutes.get("/user/:id", getUserSchema, validRequest, listUserById.handle);

userRoutes.put(
  "/user/:id",
  isAdmin,
  updateUserSchema,
  validRequest,
  updateUserController.handle
);

userRoutes.patch(
  "/user/:id/update-password",
  isAdmin,
  updateUserPasswordSchema,
  validRequest,
  updatePasswordController.handle
);

userRoutes.patch(
  "/user/:id/reset-password",
  isAdmin,
  resetPasswordSchema,
  validRequest,
  resetPasswordController.handle
);

userRoutes.patch(
  "/user/:id/turn-admin",
  turnAdminSchema,
  validRequest,
  isAdmin,
  turnAdminController.handle
);

userRoutes.delete(
  "/user/:id",
  deleteUserSchema,
  validRequest,
  isAdmin,
  deleteUserController.handle
);

export { userRoutes };
