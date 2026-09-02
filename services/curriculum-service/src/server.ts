import express from "express";

import {
  CurriculumService,
} from "./service";

const app = express();

const curriculumService =
  new CurriculumService();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    service: "curriculum-service",
    status: "ok",
  });
});

app.get("/curriculum", (_req, res) => {
  return res.json(
    curriculumService.getCurriculum()
  );
});

app.get("/subjects", (_req, res) => {
  return res.json(
    curriculumService.getSubjects()
  );
});

app.get("/chapters", (_req, res) => {
  return res.json(
    curriculumService.getChapters()
  );
});

app.get("/topics", (_req, res) => {
  return res.json(
    curriculumService.getTopics()
  );
});

app.get(
  "/subjects/:subjectId/chapters",
  (req, res) => {
    const subjectId =
      String(
        req.params.subjectId || ""
      ).trim();

    if (!subjectId) {
      return res.status(400).json({
        error: "Subject ID is required",
      });
    }

    return res.json(
      curriculumService
        .getChaptersBySubject(subjectId)
    );
  }
);

app.get(
  "/chapters/:chapterId/topics",
  (req, res) => {
    const chapterId =
      String(
        req.params.chapterId || ""
      ).trim();

    if (!chapterId) {
      return res.status(400).json({
        error: "Chapter ID is required",
      });
    }

    return res.json(
      curriculumService
        .getTopicsByChapter(chapterId)
    );
  }
);

const PORT = Number(process.env.PORT) || 4004;

app.listen(PORT, () => {
  console.log(
    `Curriculum Service running on port ${PORT}`
  );
});
