import express from "express";
import{addFinanceform} from "../controllers/financeController"
const router = express.Router();

router.post("/addFinanceform", addFinanceform);
export default router;