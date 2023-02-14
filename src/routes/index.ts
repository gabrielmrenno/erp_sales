import { Router } from "express";
import authenticateController from "../useCases/account/authenticate";
import { userRoutes } from "./users.routes";

const router = Router();

router.use("/users", userRoutes);

router.get("/auth/login", (request, response) => {
  return authenticateController().handle(request, response);
});

export { router };
