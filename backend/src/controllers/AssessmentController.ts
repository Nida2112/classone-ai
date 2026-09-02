import { Request, Response, NextFunction } from "express";

import { AssessmentService } from "../services/AssessmentService";

const assessmentService = new AssessmentService();

export const getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topicId = String(
      req.params.topicId || ""
    ).trim();

    if (!topicId) {
      return res.status(400).json({
        error: "Topic ID is required"
      });
    }

    return res.json(
      await assessmentService.getQuestions(topicId)
    );
  } catch (error) {
    next(error);
  }
};

export const submitAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = String(
      req.params.studentId || ""
    ).trim();

    const questionId = String(
      req.params.questionId || ""
    ).trim();

    const { answer } = req.body;

    if (!studentId || !questionId) {
      return res.status(400).json({
        error: "Student ID and question ID are required"
      });
    }

    if (typeof answer !== "string") {
      return res.status(400).json({
        error: "Answer is required"
      });
    }

    const result =
      await assessmentService.submitAnswer(
        studentId,
        questionId,
        answer
      );

    if (!result) {
      return res.status(404).json({
        error: "Question not found"
      });
    }

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getStudentAttempts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = String(
      req.params.id || ""
    ).trim();

    if (!studentId) {
      return res.status(400).json({
        error: "Student ID is required"
      });
    }

    return res.json(
      await assessmentService.getStudentAttempts(
        studentId
      )
    );
  } catch (error) {
    next(error);
  }
};
