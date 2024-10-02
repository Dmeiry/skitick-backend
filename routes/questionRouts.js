import express from "express";
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

// Create a new question
router.post("/", createQuestion);

// Update a question by ID
router.put("/", updateQuestion);

// Delete a question by ID
router.delete("/", deleteQuestion);

export default router;
