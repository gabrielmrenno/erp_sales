import { Router } from "express";
import createUserController from "../useCases/users/create-user";
import listAllUsersController from "../useCases/users/list-all-users";
import listUserById from "../useCases/users/list-user-by-id";
import updateUserController from "../useCases/users/update-user";
import updatePasswordController from "../useCases/users/update-password";
import resetPasswordController from "../useCases/users/reset-password";
import turnAdminController from "../useCases/users/turn-admin";
import deleteUserController from "../useCases/users/delete-user";

const userRoutes = Router();

userRoutes.post("/", (request, response) => {
  return createUserController().handle(request, response);
});

userRoutes.get("/", (request, response) => {
  return listAllUsersController().handle(request, response);
});

userRoutes.get("/user/:id", (request, response) => {
  return listUserById().handle(request, response);
});

userRoutes.put("/user/:id", (request, response) => {
  return updateUserController().handle(request, response);
});

userRoutes.patch("/user/:id/update-password", (request, response) => {
  return updatePasswordController().handle(request, response);
});

userRoutes.patch("/reset-password", (request, response) => {
  return resetPasswordController().handle(request, response);
});

userRoutes.patch("/user/:id/turn-admin", (request, response) => {
  return turnAdminController().handle(request, response);
});

userRoutes.delete("/user/:id", (request, response) => {
  return deleteUserController().handle(request, response);
});

export { userRoutes };
