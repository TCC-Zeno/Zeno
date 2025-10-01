import express from "express";
import {createEmployee, getEmployee } from "../controllers/employeeController.js";

const router = express.Router();

// rotas do employee

router.post("/signup", createEmployee)
router.post("/contributors", getEmployee)

export default router;
