import express from "express";

import {
  AssessmentService,
} from "./service";

const app = express();

const assessmentService =
  new AssessmentService();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    service: "assessment-service",
    status: "ok",
  });
});

app.get(
  "/assessments/topic/:topicId/questions",
  (req, res) => {
    const topicId =
      String(
        req.params.topicId || ""
      ).trim();

    if (!topicId) {
      return res.status(400).json({
        error: "Topic ID is required",
      });
    }

    return res.json(
      assessmentService
        .getQuestions(topicId)
    );
  }
);

app.post(
  "/assessments/student/:studentId/question/:questionId/answer",
  async (req, res) => {
    try {
      const studentId =
        String(
          req.params.studentId || ""
        ).trim();

      const questionId =
        String(
          req.params.questionId || ""
        ).trim();

      const { answer } =
        req.body;

      if (
        !studentId ||
        !questionId
      ) {
        return res.status(400).json({
          error:
            "Student ID and question ID are required",
        });
      }

      if (
        typeof answer !== "string"
      ) {
        return res.status(400).json({
          error: "Answer is required",
        });
      }

      const result =
        await assessmentService
          .submitAnswer(
            studentId,
            questionId,
            answer
          );

      if (!result) {
        return res.status(404).json({
          error: "Question not found",
        });
      }

      return res.json(result);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error:
          "Failed to submit assessment answer",
      });
    }
  }
);

app.get(
  "/assessments/student/:studentId/attempts",
  (req, res) => {
    const studentId =
      String(
        req.params.studentId || ""
      ).trim();

    if (!studentId) {
      return res.status(400).json({
        error: "Student ID is required",
      });
    }

    return res.json(
      assessmentService
        .getStudentAttempts(studentId)
    );
  }
);

const PORT = Number(process.env.PORT) || 4003;

app.listen(PORT, () => {
  console.log(
    `Assessment Service running on port ${PORT}`
  );
});
