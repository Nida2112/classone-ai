import { Request, Response } from "express";
import { CurriculumService } from "../services/CurriculumService";

const curriculumService = new CurriculumService();

export const getCurriculum = (
  _req: Request,
  res: Response
) => {
  return res.json(curriculumService.getCurriculum());
};