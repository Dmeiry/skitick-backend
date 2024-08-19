import { Router } from "express";

import { getAllUsers } from "../controllers/userController.js";
// get all users
const router = Router();

router.get('/getUsers', getAllUsers)


export default router

