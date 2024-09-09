import { Router } from "express";
import { getAllStickers, insert, update, getById, deleteById,undeleteById,setActive,setInactive} from "../controllers/stickersController.js";
// EXPRESS' router
const router = Router();

// get all stickers
router.get('/stickers', getAllStickers)
router.get('/get-by-id/:id', getById)
router.post('/insert', insert)
router.put('/update/:id', update)
router.delete('/delete-by-id/:id', deleteById)
router.put("/undelete-by-id/:id", undeleteById);
router.put("/set-active/:id", setActive);
router.put("/set-inactive/:id", setInactive);

export default router

