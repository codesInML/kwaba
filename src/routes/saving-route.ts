import { Router } from "express";
import {
  createSavingController,
  getAllUserInvitesController,
  getSavingsController,
  inviteToSavingController,
  updateInviteController,
} from "../controllers";
import { validateRequestMiddleware } from "../helpers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";
import {
  createSavingSchema,
  inviteUserSchema,
  updateInviteSchema,
} from "../schema";

const router = Router();

router.use(currentUserMiddleware, requireAuthMiddleware);

router
  .route("/")
  .post(createSavingSchema(), validateRequestMiddleware, createSavingController)
  .get(getSavingsController);

router
  .route("/invite")
  .post(inviteUserSchema(), validateRequestMiddleware, inviteToSavingController)
  .get(getAllUserInvitesController)
  .patch(
    updateInviteSchema(),
    validateRequestMiddleware,
    updateInviteController
  );

export { router as accountRoute };
