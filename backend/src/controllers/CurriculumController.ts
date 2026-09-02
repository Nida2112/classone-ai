import { Request, Response, NextFunction } from "express";
import {
  CurriculumServiceClient,
} from "../clients/CurriculumServiceClient";

const curriculumServiceClient =
  new CurriculumServiceClient();

export const getCurriculum = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(
      await curriculumServiceClient.getCurriculum()
    );
  } catch (error) {
    next(error);
  }
};
