import { Router } from "express";

import { tutorChat } from "../controllers/AIController";

const router = Router();

router.post("/chat", tutorChat);

export default router;