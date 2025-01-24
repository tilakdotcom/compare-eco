import { Router } from "express";
import { newQuarrel } from "../controllers/quarrel.controller";
import upload from "../../middlewares/multer.middleware";


const router = Router()


router.route("/new").post(upload.single("image"),newQuarrel)


export default router