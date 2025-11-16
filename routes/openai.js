import express from "express";
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "OpenAI route is live" });
});

export default router;

