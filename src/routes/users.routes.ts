import { Router } from "express";
import createUserController from "../useCases/create-user";
import listAllUsersController from "../useCases/list-all-users";
import listUserById from "../useCases/list-user-by-id";
import updateUserController from "../useCases/update-user";

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

export { userRoutes };
