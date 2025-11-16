import express from "express";
import { chatWithCookie } from "../controllers/openaiController.js";
import { verifyToken } from "../middleware/verifyFirebase.js";

const router = express.Router();
// TEST ROUTE -----------------------------
router.get("/test", (req, res) => {
  res.json({ message: "OpenAI route is working!" });
});
//  POST  /api/openai/chat
router.post("/chat", verifyToken, chatWithCookie);

export default router;
