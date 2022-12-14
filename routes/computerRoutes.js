import express from "express";
import { getAllComputers , insertComputer } from "../controllers/computerController.js";

const router = express.Router();
router.use(express.json({limit:"50mb"}));

router.post("/getAllComputers" , getAllComputers);
router.post("/insertComputer" , insertComputer);

export default router;