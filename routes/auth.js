import express from "express";
import { getUser } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/me", verifyToken, getUser);

export default router;
