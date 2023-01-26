import { Router } from "express";
import createUserController from "../useCases/create-user";
import listAllUsersController from "../useCases/list-all-users";

const userRoutes = Router();

userRoutes.post("/", (request, response) => {
    return createUserController().handle(request, response);
});

userRoutes.get("/", (request, response) => {
    return listAllUsersController().handle(request, response);
});

export { userRoutes };