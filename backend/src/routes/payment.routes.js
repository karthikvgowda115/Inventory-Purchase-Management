import express from "express";
import { createPayment, getPayments } from "../controllers/payment.controller.js";
import { validatePayment } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/", validatePayment, createPayment);
router.get("/", getPayments);

export default router;
