import { Router } from "express";
import { validRequest } from "../../middleware";
import { loginSchema } from "../../middleware/schemas/accountSchema";
import { AuthenticateController } from "../controllers/account/authenticate-controller";
import { userRoutes } from "./users.routes";
import { customerRoutes } from "./customers.route";

const router = Router();

const authenticateController = new AuthenticateController();

router.use("/users", userRoutes);
router.use("/customers", customerRoutes);

router.get(
  "/auth/login",
  loginSchema,
  validRequest,
  authenticateController.handle
);

export { router };
