import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";

const router = Router();

router.route("/register").post(signup);
router.route("/login").post(login);

export default router;
