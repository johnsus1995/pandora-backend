import express from "express";
import { createCustomer, updateCustomer } from "../controllers/customer.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create",verifyToken, createCustomer);
router.put("/:id",verifyToken,updateCustomer)


export default router