import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { createCustomer } from "../controllers/customers/create-controller";
import { listCustomers } from "../controllers/customers/list-controller";
import { listCustomersByCode } from "../controllers/customers/list-by-code-controller";

export const customerRoutes = Router();

customerRoutes.use(isAuthenticated);

customerRoutes.post("/", createCustomer);
customerRoutes.get("/all", listCustomers);
customerRoutes.get("/:code", listCustomersByCode);
