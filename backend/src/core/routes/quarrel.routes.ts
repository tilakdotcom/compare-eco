import { Router } from "express";
import {
  deleteQuarrel,
  getQuarrel,
  getQuarrels,
  newQuarrel,
  updateQuarrel,
} from "../controllers/quarrel.controller";
import upload from "../../middlewares/multer.middleware";
import verifyUser from "../../middlewares/auth.middleware";

const router = Router();

router.use(verifyUser);

router.route("/").get(getQuarrels);

router.route("/new").post(upload.single("image"), newQuarrel);

router
  .route("/:quarrelId")
  .delete(deleteQuarrel)
  .get(getQuarrel)
  .patch(updateQuarrel);

export default router;
