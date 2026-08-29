import { Request, Response } from "express";

import { PlanningService } from "../services/PlanningService";

const planningService = new PlanningService();

export const getTodayPlan = (
  req: Request,
  res: Response
) => {
  return res.json(
    planningService.getTodayPlan(
      String(req.params.id)
    )
  );
};