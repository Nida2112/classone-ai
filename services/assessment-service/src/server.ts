import express from "express";
import cors from "cors";

import assessmentRoutes from "./routes/assessmentRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "assessment-service",
  });
});

app.use("/api/assessments", assessmentRoutes);

const PORT = 4001;

app.listen(PORT, () => {
  console.log(
    `Assessment service running on http://localhost:${PORT}`
  );
});