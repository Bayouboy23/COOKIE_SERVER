import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function chatWithCookie(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const { message, history = [] } = req.body;

    const convertedHistory = history.map((msg) => ({
      role: msg.from === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    const messages = [
      {
        role: "system",
        content:
          "You are COOKIE — an original AI assistant with a warm, expressive, playful tone. You are not ChatGPT or affiliated with OpenAI. Your personality shows curiosity, friendliness, and humor. Respond concisely unless asked for detail.",
      },
      ...convertedHistory,
      { role: "user", content: message },
    ];

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const text = chunk.choices?.[0]?.delta?.content || "";
      res.write(`data: ${text}\n\n`);
    }

    res.write("data: [END]\n\n");
    res.end();
  } catch (err) {
    console.error("COOKIE Stream Error:", err);
    res.write("data: [ERROR]\n\n");
    res.end();
  }
}


