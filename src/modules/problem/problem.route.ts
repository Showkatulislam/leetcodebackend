import { UserRole } from "../../../generated/prisma/enums.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { authorize } from "../../middlewares/authorize.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { catchAsync } from "../../shared/utils/catch.async.js";
import router from "../test/test.route.js";
import { problemController } from "./problem.controller.js";
import { createProblemSchema, problemIdSchema, problemSearchSchema, updateProblemSchema } from "./problem.schema.js";

router.post(
  "/",
  authenticate,
  authorize(UserRole.ADMIN),
  validate({
    body: createProblemSchema,
  }),
  catchAsync(problemController.createProblem)
);

router.patch(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  validate({
    params: problemIdSchema,
    body: updateProblemSchema,
  }),
  catchAsync(problemController.updateProblem)
);

router.delete(
    "/:id",
    authenticate,
    authorize(UserRole.ADMIN),
    validate({
        params:problemIdSchema
    }),
    catchAsync(
        problemController.deleteProblem.bind(problemController)
    )
)

router.get(
  "/:id",
  validate({
    params:problemIdSchema,
  }),
  catchAsync(
    problemController.getProblemById.bind(problemController)
  )
)

router.get(
    "/",
    catchAsync(
        problemController.getProblems.bind(
            problemController,
        ),
    ),
);

router.get(
    "/search",
    validate({
        query: problemSearchSchema,
    }),
    catchAsync(
        problemController.searchProblems.bind(
            problemController,
        ),
    ),
);