import { Router } from "express";
import { getAll, insert } from "../controllers/boardController.js";
// EXPRESS' router
const router = Router();

// get all boards
router.get('/getAll', getAll)

// insert new record to database
router.post('/insert', insert)


export default router

