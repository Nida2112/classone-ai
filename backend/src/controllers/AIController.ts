import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  AIService,
} from "../services/AIService";

const aiService = new AIService();

export const tutorChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      question,
      topic,
    } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "question is required",
      });
    }

    return res.json(
      await aiService.generateTutorResponse(
        String(question),
        topic
          ? String(topic)
          : undefined
      )
    );
  } catch (error) {
    next(error);
  }
};
