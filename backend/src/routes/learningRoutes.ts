import { Router } from "express";
import {
  getStudentProgress,
  updateTopicProgress,
} from "../controllers/LearningController";

const router = Router();

router.get("/:id/progress", getStudentProgress);

router.patch(
  "/:id/topics/:topicId/progress",
  updateTopicProgress
);

export default router;