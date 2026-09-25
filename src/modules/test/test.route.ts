import { Router } from "express";
import { testController } from "./test.controller.js";
import { catchAsync } from "../../shared/utils/catch.async.js";

const router = Router();

router.get("/success", catchAsync(testController.success));

router.get("/failure", catchAsync(testController.failure));

export default router;
