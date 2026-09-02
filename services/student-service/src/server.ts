import express from "express";
import { StudentService } from "./service";

const app = express();
const studentService = new StudentService();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    service: "student-service",
    status: "ok"
  });
});

app.get("/students", (_req, res) => {
  return res.json(studentService.getStudents());
});

app.get("/students/:id", (req, res) => {
  const studentId = String(req.params.id || "").trim();

  if (!studentId) {
    return res.status(400).json({
      error: "Student ID is required"
    });
  }

  const student = studentService.getStudent(studentId);

  if (!student) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  return res.json(student);
});

const PORT = Number(process.env.PORT) || 4001;

app.listen(PORT, () => {
  console.log(`Student Service running on port ${PORT}`);
});
