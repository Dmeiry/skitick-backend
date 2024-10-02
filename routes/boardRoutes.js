import { Router } from "express";
import {
  getAll,
  insert,
  update,
  getById,
  deleteById,
  undeleteById,
  setActive,
  setInactive,
} from "../controllers/boardController.js";
// EXPRESS' router
const router = Router();

router.get("/getAll", getAll);
router.get("/get-by-id/:id", getById);
router.post("/insert", insert);
router.put("/update/:id", update);
router.delete("/delete-by-id/:id", deleteById);
router.put("/undelete-by-id/:id", undeleteById);
router.put("/set-active/:id", setActive);
router.put("/set-inactive/:id", setInactive);

export default router;
