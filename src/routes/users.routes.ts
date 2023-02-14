import { Router } from "express";
import createUserController from "../useCases/users/create-user";
import listAllUsersController from "../useCases/users/list-all-users";
import listUserById from "../useCases/users/list-user-by-id";
import updateUserController from "../useCases/users/update-user";
import updatePasswordController from "../useCases/users/update-password";
import resetPasswordController from "../useCases/users/reset-password";
import turnAdminController from "../useCases/users/turn-admin";
import deleteUserController from "../useCases/users/delete-user";
import { isAutheticated } from "../middleware/isAutheticated";
import { isAdmin } from "../middleware/isAdmin";

const userRoutes = Router();

userRoutes.use(isAutheticated);

userRoutes.post("/", isAdmin, (request, response) => {
  return createUserController().handle(request, response);
});

userRoutes.get("/", isAdmin, (request, response) => {
  return listAllUsersController().handle(request, response);
});

userRoutes.get("/user/:id", (request, response) => {
  return listUserById().handle(request, response);
});

userRoutes.put("/user/:id", isAdmin, (request, response) => {
  return updateUserController().handle(request, response);
});

userRoutes.patch("/user/:id/update-password", (request, response) => {
  return updatePasswordController().handle(request, response);
});

userRoutes.patch("/reset-password", isAdmin, (request, response) => {
  return resetPasswordController().handle(request, response);
});

userRoutes.patch("/user/:id/turn-admin", isAdmin, (request, response) => {
  return turnAdminController().handle(request, response);
});

userRoutes.delete("/user/:id", isAdmin, (request, response) => {
  return deleteUserController().handle(request, response);
});

export { userRoutes };
