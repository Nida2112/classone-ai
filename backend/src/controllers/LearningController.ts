import { Request, Response, NextFunction } from "express";

import { LearningService } from "../services/LearningService";

const learningService = new LearningService();

export const getStudentProgress = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = String(req.params.id || "").trim();

    if (!studentId) {
      return res.status(400).json({
        error: "Student ID is required",
      });
    }

    const progress = learningService.getStudentProgress(studentId);

    if (!progress) {
      return res.status(404).json({
        error: "Student progress not found",
      });
    }

    return res.json(progress);
  } catch (error) {
    next(error);
  }
};