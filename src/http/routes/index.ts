import { Router } from "express";
import { validRequest } from "../../middleware";
import { loginSchema } from "../../middleware/schemas/accountSchema";
import { AuthenticateController } from "../controllers/account/authenticate-controller";
import { userRoutes } from "./users.routes";
import { customerRoutes } from "./customers.route";
import { productsInfoRoutes } from "./product-info.route";
import { orderRoutes } from "./orders.route";
import { productionLaunchesRoutes } from "./production-launches.route";

const router = Router();

const authenticateController = new AuthenticateController();

router.use("/users", userRoutes);
router.use("/customers", customerRoutes);
router.use("/products-info", productsInfoRoutes);
router.use("/orders", orderRoutes);
router.use("/production-launches", productionLaunchesRoutes);

router.get(
  "/auth/login",
  loginSchema,
  validRequest,
  authenticateController.handle
);

export { router };
