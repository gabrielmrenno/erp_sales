import { Router } from "express";
import { AuthenticateController } from "../useCases/account/authenticate/authenticate-controller";
import { userRoutes } from "./users.routes";

const router = Router();

const authenticateController = new AuthenticateController();

router.use("/users", userRoutes);

router.get("/auth/login", authenticateController.handle);

export { router };
