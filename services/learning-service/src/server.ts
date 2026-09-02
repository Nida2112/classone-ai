import express from "express";
import { LearningService } from "./service";

const app = express();
const learningService = new LearningService();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    service: "learning-service",
    status: "ok"
  });
});

app.get("/learning/:studentId/progress", (req, res) => {
  const studentId = String(
    req.params.studentId || ""
  ).trim();

  if (!studentId) {
    return res.status(400).json({
      error: "Student ID is required"
    });
  }

  return res.json(
    learningService.getStudentProgress(studentId)
  );
});

app.get(
  "/learning/:studentId/topics/:topicId",
  (req, res) => {
    const studentId = String(
      req.params.studentId || ""
    ).trim();

    const topicId = String(
      req.params.topicId || ""
    ).trim();

    if (!studentId || !topicId) {
      return res.status(400).json({
        error: "Student ID and topic ID are required"
      });
    }

    const progress =
      learningService.getTopicProgress(
        studentId,
        topicId
      );

    if (!progress) {
      return res.status(404).json({
        error: "Topic progress not found"
      });
    }

    return res.json(progress);
  }
);

app.patch(
  "/learning/:studentId/topics/:topicId",
  (req, res) => {
    const studentId = String(
      req.params.studentId || ""
    ).trim();

    const topicId = String(
      req.params.topicId || ""
    ).trim();

    if (!studentId || !topicId) {
      return res.status(400).json({
        error: "Student ID and topic ID are required"
      });
    }

    const updates = req.body;

    if (
      updates.progress !== undefined &&
      (
        typeof updates.progress !== "number" ||
        updates.progress < 0 ||
        updates.progress > 100
      )
    ) {
      return res.status(400).json({
        error: "Progress must be a number between 0 and 100"
      });
    }

    if (
      updates.mastery !== undefined &&
      (
        typeof updates.mastery !== "number" ||
        updates.mastery < 0 ||
        updates.mastery > 100
      )
    ) {
      return res.status(400).json({
        error: "Mastery must be a number between 0 and 100"
      });
    }

    const updated =
      learningService.updateTopicProgress(
        studentId,
        topicId,
        updates
      );

    if (!updated) {
      return res.status(404).json({
        error: "Topic progress not found"
      });
    }

    return res.json(updated);
  }
);

const PORT = Number(process.env.PORT) || 4002;

app.listen(PORT, () => {
  console.log(
    `Learning Service running on port ${PORT}`
  );
});
