import { Request, Response, NextFunction } from "express";

import { StudentService } from "../services/StudentService";

const studentService = new StudentService();

export const getStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = String(req.params.id || "").trim();

    if (!studentId) {
      return res.status(400).json({
        error: "Student ID is required",
      });
    }

    const student = studentService.getStudent(studentId);

    if (!student) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    return res.json(student);
  } catch (error) {
    next(error);
  }
};