import express from "express";
import { getAllKeyboards , insertKeyboard } from "../controllers/keyboardController.js";

const router = express.Router();
router.use(express.json({limit:"50mb"}));

router.post("/getAllKeyboards" , getAllKeyboards );
router.post("/insertKeyboard" , insertKeyboard );

export default router;