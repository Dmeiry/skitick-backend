// Import necessary modules
import express from "express";
import {
  addBoardToUser,
  deleteBoardFromUser,
} from "../controllers/userBoardController.js";

const router = express.Router();

// Define the route for adding a board to a user
router.post("/addBoardToUser", addBoardToUser);

// Define the route for deleting a board from a user
router.delete("/deleteBoardFromUser", deleteBoardFromUser);

export default router;
