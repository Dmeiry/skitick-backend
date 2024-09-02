import express from "express";
import { submitAnswers } from "../controllers/userQuestionController.js";

const router = express.Router();

// Define the route for submitting answers to a board
router.post("/submitAnswers", submitAnswers);

export default router;
