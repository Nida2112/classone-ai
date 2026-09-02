import { Router } from "express";

import {
  getQuestions,
  submitAnswer,
  getStudentAttempts,
} from "../controllers/AssessmentController";

const router = Router();

router.get(
  "/topic/:topicId/questions",
  getQuestions
);

router.post(
  "/student/:studentId/question/:questionId/answer",
  submitAnswer
);

router.get(
  "/student/:id/attempts",
  getStudentAttempts
);

export default router;
