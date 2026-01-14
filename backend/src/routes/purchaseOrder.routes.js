import express from "express";
import {
  createPurchaseOrder,
  getPurchaseOrders,
  approvePurchaseOrder,
  deletePurchaseOrder
} from "../controllers/purchaseOrder.controller.js";

import { validatePurchaseOrder } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/", validatePurchaseOrder, createPurchaseOrder);
router.get("/", getPurchaseOrders);
router.patch("/approve/:id", approvePurchaseOrder);
router.delete("/:id", deletePurchaseOrder); // DELETE route

export default router;
