import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller";
import verifyUser from "../../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(signup);
router.route("/login").post(login);

router.use(verifyUser)
router.route("/logout").get(logout)

export default router;
