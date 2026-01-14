import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} from "../controllers/item.controller.js";

import { validateItem } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/", validateItem, createItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.put("/:id", validateItem, updateItem);
router.delete("/:id", deleteItem);

export default router;
