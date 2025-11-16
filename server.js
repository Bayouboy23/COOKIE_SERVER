// routes/openai.mjs
import express from "express";
import OpenAI from "openai";
import verifyToken from "../middleware/auth.mjs";

const router = express.Router();

// 🔹 Simple test route: no auth, just checks server & key
router.get("/test", (req, res) => {
  const key = process.env.OPENAI_API_KEY;

  if (!key) {
    return res.json({
      ok: false,
      message: "Missing OPENAI_API_KEY in environment",
    });
  }

  return res.json({
    ok: true,
    message: "COOKIE SERVER OpenAI route is live ✅",
    keyLength: key.length,
  });
});

// 🔹 Main chat route (protected – requires JWT from mobile app)
router.post("/chat", verifyToken, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are COOKIE, a friendly chat assistant." },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0]?.message?.content || "";

    return res.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err);
    return res
      .status(500)
      .json({ error: "Failed to connect to COOKIE AI server." });
  }
});

export default router;


