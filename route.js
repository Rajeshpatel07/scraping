import { Router } from "express";
import { getStories } from "./controller/controller.js";

const router = Router();

router.get("/stories", getStories);

export default router;
