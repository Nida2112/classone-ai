import { Router } from "express";
import { getCurriculum } from "../controllers/CurriculumController";

const router = Router();

router.get("/", getCurriculum);

export default router;