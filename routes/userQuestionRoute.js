import express from "express";
import {
  addQuestionToBoard,
  getBoardAnswers,
} from "../controllers/userQuestionController.js";

const router = express.Router();

// Define the route for adding a question to a user's board
router.post("/addQuestionToBoard", addQuestionToBoard);

// Define the route for getting user answers for a specific board
router.get("/getBoardAnswers", getBoardAnswers);

export default router;
