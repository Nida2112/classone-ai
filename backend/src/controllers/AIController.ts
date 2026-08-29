import { Request, Response } from "express";

import { AIService } from "../services/AIService";

const aiService = new AIService();

export const tutorChat = (
  req: Request,
  res: Response
) => {
  const { question, topic } = req.body;

  if (!question) {
    return res.status(400).json({
      error: "question is required",
    });
  }

  return res.json(
    aiService.generateTutorResponse(
      String(question),
      topic ? String(topic) : undefined
    )
  );
};