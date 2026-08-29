import { Router } from "express";
import { getStudentProgress } from "../controllers/LearningController";

const router = Router();

router.get("/:id/progress", getStudentProgress);

export default router;