import { Router } from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { createProductionLaunch } from "../controllers/production-launches/create-controller";

export const productionLaunchesRoutes = Router();

productionLaunchesRoutes.use(isAuthenticated);

// Create
productionLaunchesRoutes.post("/", createProductionLaunch);

// // Read
// productionLaunchesRoutes.get("/all", listProductionLaunches);
// productionLaunchesRoutes.get("/production-launch/:code", getProductionLaunch);

// // Update
// productionLaunchesRoutes.put("/:id", updateProductionLaunch);

// // Delete
// productionLaunchesRoutes.delete(
//   "/production-launch/:code",
//   deleteProductionLaunch
// );
