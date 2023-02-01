import { Router } from "express";
import createUserController from "../useCases/create-user";
import listAllUsersController from "../useCases/list-all-users";
import listUserById from "../useCases/list-user-by-id";
import updateUserController from "../useCases/update-user";
import updatePasswordController from "../useCases/update-password";
import resetPasswordController from "../useCases/reset-password";
import turnAdminController from "../useCases/turn-admin";
import deleteUserController from "../useCases/delete-user";

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
