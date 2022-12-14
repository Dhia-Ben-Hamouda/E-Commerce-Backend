import express from "express";
import { signIn , signUp  } from "../controllers/authController.js";

const router = express.Router();
router.use(express.json());

router.post("/signIn" , signIn);
router.post("/signUp" , signUp)

export default router;