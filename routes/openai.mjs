import express from "express";
import { chatWithCookie } from "../controllers/openaiController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

//  POST  /api/openai/chat
router.post("/chat", verifyToken, chatWithCookie);

export default router;
