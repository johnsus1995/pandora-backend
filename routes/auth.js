import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// router.put("/update-user/:id", updateUser);


export default router;
