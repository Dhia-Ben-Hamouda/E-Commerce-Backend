import express from "express";
import { getAllScreens , insertScreen } from "../controllers/screenController.js";

const router = express.Router();
router.use(express.json({limit:"50mb"}));

router.post("/getAllScreens" , getAllScreens );
router.post("/insertScreen" , insertScreen );

export default router;