import { Router } from "express";

import { createProductInfo } from "../controllers/products-info/create-controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { isAdmin } from "../../middleware/isAdmin";
import { listProductsInfo } from "../controllers/products-info/list-customer";

export const productsInfoRoutes = Router();

productsInfoRoutes.use(isAuthenticated);

// Create
productsInfoRoutes.post("/", isAdmin, createProductInfo);

// Read
productsInfoRoutes.get("/all", isAdmin, listProductsInfo);
