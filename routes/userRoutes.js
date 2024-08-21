import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";
// EXPRESS' router
const router = Router();

// get all users
router.get('/getAll', getAllUsers)


export default router

