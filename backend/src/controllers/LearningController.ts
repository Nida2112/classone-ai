import { Request, Response } from "express";
import { LearningService } from "../services/LearningService";

const learningService = new LearningService();

export const getStudentProgress = (
  req: Request,
  res: Response
) => {
  return res.json(
    learningService.getStudentProgress(String(req.params.id))
  );
};