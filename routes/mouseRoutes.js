import express from "express";
import { getAllMouses , insertMouse } from "../controllers/mouseController.js";

const router = express.Router();
router.use(express.json({limit:"50mb"}));

router.post("/getAllMouses" , getAllMouses );
router.post("/insertMouse" , insertMouse );

export default router;