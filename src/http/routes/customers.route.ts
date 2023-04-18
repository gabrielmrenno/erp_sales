import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { createCustomer } from "../controllers/customers/create-controller";

export const customerRoutes = Router();

customerRoutes.use(isAuthenticated);

customerRoutes.post("/", createCustomer);
