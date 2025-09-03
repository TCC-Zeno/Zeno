import express from "express";
import {insertAppoitment, updateAppoiment, deleteAppoiment, getAppoimentUuid, getAppoimentId } from "../controllers/calendarController.js";
const router = express.Router();

router.post("/insert", insertAppoitment );
router.post("/fetchUuid", getAppoimentUuid);
router.post("/fetchId",getAppoimentId)
router.post("/update", updateAppoiment);
router.post("/delete", deleteAppoiment);


export default router;