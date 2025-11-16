// server.js
import express from "express";
import cors from "cors";
import openaiRoutes from "./routes/openai.js"; // make sure this path matches your file

const app = express();
const PORT = process.env.PORT || 5050;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);

app.use(express.json());

// Simple root route so we can see the server is alive
app.get("/", (req, res) => {
  res.send("COOKIE server is live");
});

// Attach OpenAI routes (NO auth middleware for now)
app.use("/api/openai", openaiRoutes);
app.get("/test", (req, res) => {
  res.json({ message: "Server is running" });
});
app.listen(PORT, () => {
  console.log(`COOKIE SERVER running on port ${PORT}`);
});

export default app;

