import express from "express";
import { addBoardToUser } from "../controllers/userBoardController.js";

const router = express.Router();

// Define the route for adding a board to a user
router.post("/addBoardToUser", addBoardToUser);

export default router;
