import { Router } from "express";

import { getTodayPlan } from "../controllers/PlanningController";

const router = Router();

router.get(
  "/student/:id/today",
  getTodayPlan
);

export default router;