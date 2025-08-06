import express from "express";
import{ addFinanceform } from "../controllers/financeController.js"
const router = express.Router();

router.post("/addFinanceForm", addFinanceform);
export default router;