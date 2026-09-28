import { Router } from "express";
import { getPublicProfile } from "./user.controller.js";

const router = Router();

router.get("/:username", getPublicProfile);

export default router;