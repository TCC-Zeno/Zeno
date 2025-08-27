import express from "express";
import {getAppoiment, insertAppoitment, updateAppoiment, deleteAppoiment } from "../controllers/calendarController.js";
const router = express.Router();

router.post("/insert", insertAppoitment );
router.post("/fetch", getAppoiment)
router.post("/update", updateAppoiment)
router.post("/delete", deleteAppoiment)

export default router;