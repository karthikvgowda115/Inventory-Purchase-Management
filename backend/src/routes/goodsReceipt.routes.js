import express from "express";
import {
  createGoodsReceipt,
  getGoodsReceipts
} from "../controllers/goodsReceipt.controller.js";
import { validateGoodsReceipt } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.get("/", getGoodsReceipts);
router.post("/", validateGoodsReceipt, createGoodsReceipt);

export default router;
