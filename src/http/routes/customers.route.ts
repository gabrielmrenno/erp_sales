import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { createCustomer } from "../controllers/customers/create-controller";
import { listCustomers } from "../controllers/customers/list-controller";

export const customerRoutes = Router();

customerRoutes.use(isAuthenticated);

customerRoutes.post("/", createCustomer);
customerRoutes.get("/", listCustomers);
