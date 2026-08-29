import { Request, Response } from "express";
import { StudentService } from "../services/StudentService";

const studentService = new StudentService();

export const getStudent = (
  req: Request,
  res: Response
) => {
  const student = studentService.getStudent(String(req.params.id));


  if (!student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  return res.json(student);
};