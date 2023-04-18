import { Router } from "express";

import { createProductInfo } from "../controllers/products-info/create-controller";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { isAdmin } from "../../middleware/isAdmin";
import { listProductsInfo } from "../controllers/products-info/list-customer";
import { getProductsInfoByCode } from "../controllers/products-info/get-by-code-controller";
import { updateProductInfo } from "../controllers/products-info/update-controller";
import { updateProductInfoPrice } from "../controllers/products-info/update-price-controller";
import { deleteProductInfo } from "../controllers/products-info/delete-controller";

export const productsInfoRoutes = Router();

productsInfoRoutes.use(isAuthenticated);

// Create
productsInfoRoutes.post("/", isAdmin, createProductInfo);

// Read
productsInfoRoutes.get("/all", listProductsInfo);
productsInfoRoutes.get("/:code", getProductsInfoByCode);

// Update
productsInfoRoutes.put("/:code", isAdmin, updateProductInfo);
productsInfoRoutes.patch("/:code", isAdmin, updateProductInfoPrice);

// Delete
productsInfoRoutes.delete("/:code", isAdmin, deleteProductInfo);
