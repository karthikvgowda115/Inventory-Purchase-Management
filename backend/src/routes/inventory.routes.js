import express from "express";
import {
  getInventory,
  getInventoryByItem,
  adjustInventory
} from "../controllers/inventory.controller.js";

const router = express.Router();

router.get("/", getInventory);
router.get("/:itemId", getInventoryByItem);
router.put("/", adjustInventory);

export default router;
