import express from "express";
import {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor
} from "../controllers/vendor.controller.js";

const router = express.Router();

// GET all vendors
router.get("/", getVendors);

// GET single vendor by ID
router.get("/:id", getVendorById);

// CREATE vendor
router.post("/", createVendor);

// UPDATE vendor
router.put("/:id", updateVendor);

// DELETE vendor
router.delete("/:id", deleteVendor);

export default router;
