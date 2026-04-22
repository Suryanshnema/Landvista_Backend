import express from "express";
import { register, login } from "./auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login); // ✅ THIS LINE MUST EXIST

export default router;