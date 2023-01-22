import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customer.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/",verifyToken, getCustomers);
router.get("/:id", verifyToken, getCustomer);
router.post("/create", verifyToken, createCustomer);
router.put("/:id", verifyToken, updateCustomer);
router.delete("/:id",verifyToken, deleteCustomer);

export default router;
