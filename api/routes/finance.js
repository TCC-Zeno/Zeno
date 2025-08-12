import express from "express";
import{ addFinanceform, financeId } from "../controllers/financeController.js";
const router = express.Router();

router.post("/addFinanceForm", addFinanceform);
router.post("/financeId", financeId);
export default router;