import express from "express";
import {insertAppoitment } from "../controllers/calendarController.js";
const router = express.Router();

router.post("/insert", insertAppoitment );

export default router;