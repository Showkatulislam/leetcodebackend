import { Router } from "express";
import {
    getCurrentUser,
    getPublicProfile,
    updateProfile,
    updateUserRole,
} from "./user.controller.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { updateProfileSchema, updateUserRoleSchema } from "./user.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { getUserStatistics } from "./user-statistics.controller.js";
import { authorize } from "../../middlewares/authorize.js";

const router = Router();

router.get("/:username", getPublicProfile);
router.get("/me", authenticate, getCurrentUser);
router.patch("/me", authenticate, validate({ body: updateProfileSchema }), updateProfile);
router.get("/me/statistics", authenticate, getUserStatistics);
router.patch(
    "/:userId/role",
    authenticate,
    authorize("ADMIN"),
    validate({ body: updateUserRoleSchema }),
    updateUserRole,
);
export default router;
