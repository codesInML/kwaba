import { Router } from "express";
import { accountRoute } from "./saving-route";
import { authenticationRoutes } from "./auth-route";

const router = Router();

router.use("/auth", authenticationRoutes);
router.use("/saving", accountRoute);

export { router as applicationRoutes };
