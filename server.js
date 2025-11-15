import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.mjs";
import openaiRoutes from "./routes/openai.mjs";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

// ✅ DEBUG ROUTE — required for fixing the API key issue
app.get("/debug/env", (req, res) => {
  const key = process.env.OPENAI_API_KEY;

  if (!key) {
    return res.json({ openaiKey: "MISSING" });
  }

  return res.json({
    openaiKey: "LOADED",
    length: key.length,
  });
});

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/openai", openaiRoutes);

app.get("/", (req, res) => {
  res.send("COOKIE SERVER is running!");
});

// SERVER START
const PORT = process.env.PORT || 5050;

app.listen(PORT, () =>
  console.log(`COOKIE SERVER running on port ${PORT}`)
);

