import { Router } from "express";
import { newQuarrel } from "../controllers/quarrel.controller";


const router = Router()


router.route("/new").get(newQuarrel)


export default router