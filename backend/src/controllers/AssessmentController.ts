import { Request, Response } from "express";

import { AssessmentService } from "../services/AssessmentService";

const assessmentService = new AssessmentService();

export const getQuestions = (
  req: Request,
  res: Response
) => {
  const questions =
    assessmentService.getQuestions(
      String(req.params.topicId)
    );

  return res.json(questions);
};

export const submitAnswer = (
  req: Request,
  res: Response
) => {
  const { studentId, answer } = req.body;

  if (!studentId || !answer) {
    return res.status(400).json({
      error: "studentId and answer are required",
    });
  }

  const attempt =
    assessmentService.submitAnswer(
      String(studentId),
      String(req.params.questionId),
      String(answer)
    );

  if (!attempt) {
    return res.status(404).json({
      error: "Question not found",
    });
  }

  return res.json(attempt);
};

export const getStudentAttempts = (
  req: Request,
  res: Response
) => {
  return res.json(
    assessmentService.getStudentAttempts(
      String(req.params.id)
    )
  );
};