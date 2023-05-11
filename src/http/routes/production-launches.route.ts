import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { createProductionLaunch } from "../controllers/production-launches/create-controller";
import { listProductionLaunches } from "../controllers/production-launches/list-controller";
import { getProductionLaunch } from "../controllers/production-launches/get-controller";
import { updateProductionLaunches } from "../controllers/production-launches/update-controller";

export const productionLaunchesRoutes = Router();

productionLaunchesRoutes.use(isAuthenticated);

// Create
productionLaunchesRoutes.post("/", createProductionLaunch);

// // Read
productionLaunchesRoutes.get("/all", listProductionLaunches);
productionLaunchesRoutes.get("/:id", getProductionLaunch);

// // Update
productionLaunchesRoutes.put("/:id", updateProductionLaunches);

// // Delete
// productionLaunchesRoutes.delete(
//   "/production-launch/:code",
//   deleteProductionLaunch
// );
