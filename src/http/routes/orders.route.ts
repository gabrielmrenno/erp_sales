import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { createOrder } from "../controllers/orders/create-controller";
import { listOrders } from "../controllers/orders/list-controller";

export const orderRoutes = Router();

orderRoutes.use(isAuthenticated);

// Create
orderRoutes.post("/", createOrder);

// // Read
orderRoutes.get("/all", listOrders);
// orderRoutes.get("/customer/:code", listCustomersByCode);

// // Update
// orderRoutes.put("/:code", updateCustomer);

// // Delete
// orderRoutes.delete("/:code", deleteCustomer);

// // Others
// orderRoutes.get("/getInfo/:doc", getInfoByCNPJCustomer);
