import express from "express";
import{ addFinanceform, financeId, financeCategoria, addFinanceCategoria, editFinanceForm, financeDelete } from "../controllers/financeController.js";
const router = express.Router();

router.post("/addFinanceForm", addFinanceform);
router.post("/financeId", financeId);
router.post("/financeCategoria", financeCategoria);
router.post("/addFinanceCategoria", addFinanceCategoria);
router.post("/editFinanceForm", editFinanceForm);
router.post("/financeDelete", financeDelete);
export default router;