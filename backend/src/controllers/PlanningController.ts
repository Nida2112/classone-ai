import { Request, Response, NextFunction } from "express";

import { PlanningService } from "../services/PlanningService";

const planningService = new PlanningService();

export const getTodayPlan = async (
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

    const plan =
      await planningService.getTodayPlan(
        studentId
      );

    return res.json(plan);
  } catch (error) {
    next(error);
  }
};
