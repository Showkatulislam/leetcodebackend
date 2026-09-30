import express from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { authorize } from "../../middlewares/authorize.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { catchAsync } from "../../shared/utils/catch.async.js";
import { problemController } from "./problem.controller.js";
import { createProblemSchema } from "./problem.schema.js";
const router = express.Router()
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate({body:createProblemSchema}),
    catchAsync(problemController.create.bind(problemController)),
);