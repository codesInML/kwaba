import { Router } from "express";
import { createAccountController, getAccountController } from "../controllers";
import { validateRequestMiddleware } from "../helpers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";
import { createAccountSchema } from "../schema";

const router = Router();

router.use(currentUserMiddleware, requireAuthMiddleware);

router
  .route("/")
  .post(
    createAccountSchema(),
    validateRequestMiddleware,
    createAccountController
  )
  .get(getAccountController);

export { router as accountRoute };
