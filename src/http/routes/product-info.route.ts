import { Router } from "express";

import { createProductInfo } from "../controllers/products-info/create-controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { isAdmin } from "../../middleware/isAdmin";

export const productsInfoRoutes = Router();

productsInfoRoutes.use(isAuthenticated);

// Create
productsInfoRoutes.post("/", isAdmin, createProductInfo);
