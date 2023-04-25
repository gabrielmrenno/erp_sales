import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { createCustomer } from "../controllers/customers/create-controller";
import { listCustomers } from "../controllers/customers/list-controller";
import { listCustomersByCode } from "../controllers/customers/list-by-code-controller";
import { updateCustomer } from "../controllers/customers/update-controller";
import { deleteCustomer } from "../controllers/customers/delete-controller";
import { getInfoByCNPJCustomer } from "../controllers/customers/get-info-by-id-controller";

export const customerRoutes = Router();

customerRoutes.use(isAuthenticated);

// Create
customerRoutes.post("/", createCustomer);

// Read
customerRoutes.get("/all", listCustomers);
customerRoutes.get("/customer/:code", listCustomersByCode);

// Update
customerRoutes.put("/:code", updateCustomer);

// Delete
customerRoutes.delete("/:code", deleteCustomer);

// Others
customerRoutes.get("/getInfo/:doc", getInfoByCNPJCustomer);
