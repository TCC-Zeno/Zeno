import express from "express";
import { generateReport } from "../controllers/reportController.js";
const router = express.Router();

router.post("/generateReport", generateReport);

export default router;