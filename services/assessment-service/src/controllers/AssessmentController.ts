import { Request, Response } from "express";
import { AssessmentService } from "../services/AssessmentService";

const assessmentService = new AssessmentService();

export const getQuestions = (
  req: Request,
  res: Response
) => {
  const topicId =
    typeof req.query.topicId === "string"
      ? req.query.topicId
      : undefined;

  return res.json(
    assessmentService.getQuestions(topicId)
  );
};

export const submitAssessment = (
  req: Request,
  res: Response
) => {
  const { studentId, answers } = req.body;

  if (
    typeof studentId !== "string" ||
    typeof answers !== "object" ||
    answers === null
  ) {
    return res.status(400).json({
      error: "studentId and answers are required",
    });
  }

  return res.status(201).json(
    assessmentService.submitAssessment(
      studentId,
      answers
    )
  );
};

export const getStudentAttempts = (
  req: Request,
  res: Response
) => {
  return res.json(
    assessmentService.getStudentAttempts(
      String(req.params.studentId)
    )
  );
};