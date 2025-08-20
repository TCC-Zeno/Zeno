import express from "express";
import {getAppoiment, insertAppoitment } from "../controllers/calendarController.js";
const router = express.Router();

router.post("/insert", insertAppoitment );
router.post("/fetch", getAppoiment)

export default router;