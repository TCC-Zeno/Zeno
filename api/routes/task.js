import express from "express";
import { createTask, taskDelete, taskEdit, taskID, taskUpdateStatus  } from "../controllers/taskController.js";

const router = express.Router();

router.post("/createTask", createTask);
router.post("/taskEdit", taskEdit);
router.post("/taskUpdateStatus", taskUpdateStatus);
router.post("/taskID", taskID);
router.post("/taskDelete", taskDelete);

export default router;
