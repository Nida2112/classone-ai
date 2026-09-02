import express from "express";

import { AIService } from "./AIService";

const app = express();

const aiService = new AIService();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    service: "ai-service",
    status: "ok",
  });
});

app.post("/ai/chat", async (req, res) => {
  try {
    const { question, topic } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "question is required",
      });
    }

    const result =
      await aiService.generateTutorResponse(
        String(question),
        topic ? String(topic) : undefined
      );

    return res.json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "AI service failed to generate a response",
    });
  }
});

const PORT = Number(process.env.PORT) || 4005;

app.listen(PORT, () => {
  console.log(
    `AI Service running on port ${PORT}`
  );
});
