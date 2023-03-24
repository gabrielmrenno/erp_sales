import { Router } from "express";
import { validRequest } from "../middleware";
import { loginSchema } from "../middleware/schemas/accountSchema";
import { AuthenticateController } from "../useCases/account/authenticate/authenticate-controller";
import { userRoutes } from "./users.routes";

const router = Router();

const authenticateController = new AuthenticateController();

router.use("/users", userRoutes);

router.get(
  "/auth/login",
  loginSchema,
  validRequest,
  authenticateController.handle
);

export { router };
