import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { createOrder } from "../controllers/orders/create-controller";
import { listOrders } from "../controllers/orders/list-controller";
import { getOrder } from "../controllers/orders/get-order";
import { updateOrder } from "../controllers/orders/update-controller";
import { deleteUser } from "../controllers/users/delete-user-controller";
import { deleteOrder } from "../controllers/orders/delete-controller";

export const orderRoutes = Router();

orderRoutes.use(isAuthenticated);

// Create
orderRoutes.post("/", createOrder);

// // Read
orderRoutes.get("/all", listOrders);
orderRoutes.get("/order/:code", getOrder);

// // Update
orderRoutes.put("/:id", updateOrder);

// // Delete
orderRoutes.delete("/order/:code", deleteOrder);

// // Others
// orderRoutes.get("/getInfo/:doc", getInfoByCNPJCustomer);
