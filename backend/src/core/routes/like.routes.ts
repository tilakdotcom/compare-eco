import { Router } from "express";
import verifyUser from "../../middlewares/auth.middleware";
import { likePost } from "../controllers/like.controller";

const router = Router();

router.use(verifyUser);

router.route("/new/:quarrelId").post(likePost);

export default router;
