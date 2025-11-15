import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.mjs";
import openaiRoutes from "./routes/openai.mjs";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/openai", openaiRoutes);

app.get("/", (req, res) => {
  res.send("COOKIE SERVER is running!");
});

// 🔥 FIX IS HERE
const PORT = process.env.PORT || 5050;

app.listen(PORT, () =>
  console.log(`COOKIE SERVER running on port ${PORT}`)
);
