import { Router } from "express";

import {
  getQuestions,
  submitAssessment,
  getStudentAttempts,
} from "../controllers/AssessmentController";

const router = Router();

router.get("/questions", getQuestions);
router.post("/submit", submitAssessment);
router.get(
  "/students/:studentId/attempts",
  getStudentAttempts
);

export default router;