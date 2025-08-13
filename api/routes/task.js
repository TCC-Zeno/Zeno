import express from "express";
import { createTask, taskDelete, taskEdit, taskID  } from "../controllers/taskController.js";

const router = express.Router();

router.post("/createTask", createTask);
router.put("/taskEdit", taskEdit);
router.post("/taskID", taskID);
router.post("/taskDelete", taskDelete);

export default router;
