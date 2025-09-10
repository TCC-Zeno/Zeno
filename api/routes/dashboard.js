import express from "express";
import {addFinanceform} from "../controllers/dashboardController.js";

const router = express.Router();

//Rotas do dashboard
router.post("/addFinanceForm", addFinanceform);

export default router;
