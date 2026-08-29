import { Router } from "express";
import { getStudent } from "../controllers/StudentController";

const router = Router();

router.get("/:id", getStudent);

export default router;