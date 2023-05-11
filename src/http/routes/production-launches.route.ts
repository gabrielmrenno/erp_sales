import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { createProductionLaunch } from "../controllers/production-launches/create-controller";
import { listProductionLaunches } from "../controllers/production-launches/list-controller";
import { getProductionLaunch } from "../controllers/production-launches/get-controller";

export const productionLaunchesRoutes = Router();

productionLaunchesRoutes.use(isAuthenticated);

// Create
productionLaunchesRoutes.post("/", createProductionLaunch);

// // Read
productionLaunchesRoutes.get("/all", listProductionLaunches);
productionLaunchesRoutes.get("/production-launch/:id", getProductionLaunch);

// // Update
// productionLaunchesRoutes.put("/:id", updateProductionLaunch);

// // Delete
// productionLaunchesRoutes.delete(
//   "/production-launch/:code",
//   deleteProductionLaunch
// );
