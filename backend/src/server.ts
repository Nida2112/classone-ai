import express from "express";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes";
import curriculumRoutes from "./routes/curriculumRoutes";
import learningRoutes from "./routes/learningRoutes";
import { errorHandler } from "./middleware/errorHandler";
import assessmentRoutes from "./routes/assessmentRoutes";
import planningRoutes from "./routes/planningRoutes";
import aiRoutes from "./routes/aiRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "classone-backend",
  });
});

app.use("/api/students", studentRoutes);
app.use("/api/curriculum", curriculumRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/planning", planningRoutes);
app.use("/api/ai", aiRoutes);

app.use(errorHandler);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(
    `ClassOne backend running on http://localhost:${PORT}`
  );
});