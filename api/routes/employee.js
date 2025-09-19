import express from "express";
import {createEmployee } from "../controllers/employeeController.js";

const router = express.Router();

// rotas do employee

router.post("/signup", createEmployee)

export default router;
