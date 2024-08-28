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
router.put("/:id", updateQuestion);

// Delete a question by ID
router.delete("/:id", deleteQuestion);

export default router;
