import { Request, Response, NextFunction } from "express";

import { LearningService } from "../services/LearningService";

const learningService = new LearningService();

export const getStudentProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = String(req.params.id || "").trim();

    if (!studentId) {
      return res.status(400).json({
        error: "Student ID is required"
      });
    }

    const progress =
      await learningService.getStudentProgress(studentId);

    if (!progress || progress.length === 0) {
      return res.status(404).json({
        error: "Student progress not found"
      });
    }

    return res.json(progress);
  } catch (error) {
    next(error);
  }
};

export const updateTopicProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = String(req.params.id || "").trim();
    const topicId = String(req.params.topicId || "").trim();

    if (!studentId || !topicId) {
      return res.status(400).json({
        error: "Student ID and topic ID are required"
      });
    }

    const {
      progress,
      mastery,
      attempts,
      correctAnswers,
      incorrectAnswers,
      state
    } = req.body;

    if (
      progress !== undefined &&
      (
        typeof progress !== "number" ||
        progress < 0 ||
        progress > 100
      )
    ) {
      return res.status(400).json({
        error: "Progress must be a number between 0 and 100"
      });
    }

    if (
      mastery !== undefined &&
      (
        typeof mastery !== "number" ||
        mastery < 0 ||
        mastery > 100
      )
    ) {
      return res.status(400).json({
        error: "Mastery must be a number between 0 and 100"
      });
    }

    if (
      attempts !== undefined &&
      (
        typeof attempts !== "number" ||
        attempts < 0
      )
    ) {
      return res.status(400).json({
        error: "Attempts must be a non-negative number"
      });
    }

    if (
      correctAnswers !== undefined &&
      (
        typeof correctAnswers !== "number" ||
        correctAnswers < 0
      )
    ) {
      return res.status(400).json({
        error: "Correct answers must be a non-negative number"
      });
    }

    if (
      incorrectAnswers !== undefined &&
      (
        typeof incorrectAnswers !== "number" ||
        incorrectAnswers < 0
      )
    ) {
      return res.status(400).json({
        error: "Incorrect answers must be a non-negative number"
      });
    }

    if (state !== undefined && typeof state !== "string") {
      return res.status(400).json({
        error: "State must be a string"
      });
    }

    const updated =
      await learningService.updateTopicProgress(
        studentId,
        topicId,
        {
          progress,
          mastery,
          attempts,
          correctAnswers,
          incorrectAnswers,
          state
        }
      );

    if (!updated) {
      return res.status(404).json({
        error: "Topic progress not found"
      });
    }

    return res.json(updated);
  } catch (error) {
    next(error);
  }
};
