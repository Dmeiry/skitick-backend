import { Router } from "express";
import { registerUser, verifyOtp } from "../controllers/authController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);

export default router;
