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

import { createUser } from "../controllers/users/create-user-controller";
import { listAllUsers } from "../controllers/users/list-all-users-controller";
import { listUserById } from "../controllers/users/list-user-by-id-controller";
import { updateUser } from "../controllers/users/update-user-controller";
import { updatePassword } from "../controllers/users/update-password-controller";
import { resetPassword } from "../controllers/users/reset-password-controller";
import { turnAdmin } from "../controllers/users/turn-admin-controller";
import { deleteUser } from "../controllers/users/delete-user-controller";

const userRoutes = Router();

userRoutes.use(isAuthenticated);

userRoutes.post("/", createUserSchema, validRequest, isAdmin, createUser);

userRoutes.get("/", isAdmin, getUsersSchema, validRequest, listAllUsers);

userRoutes.get("/user/:id", getUserSchema, validRequest, listUserById);

userRoutes.put(
  "/user/:id",
  isAdmin,
  updateUserSchema,
  validRequest,
  updateUser
);

userRoutes.patch(
  "/user/:id/update-password",
  isAdmin,
  updateUserPasswordSchema,
  validRequest,
  updatePassword
);

userRoutes.patch(
  "/user/:id/reset-password",
  isAdmin,
  resetPasswordSchema,
  validRequest,
  resetPassword
);

userRoutes.patch(
  "/user/:id/turn-admin",
  turnAdminSchema,
  validRequest,
  isAdmin,
  turnAdmin
);

userRoutes.delete(
  "/user/:id",
  deleteUserSchema,
  validRequest,
  isAdmin,
  deleteUser
);

export { userRoutes };
