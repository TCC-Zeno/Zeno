import express from "express";
import { createEmployee, getEmployee, deleteEmployee, updateEmployee } from "../controllers/employeeController.js";

const router = express.Router();

// rotas do employee

router.post("/signup", createEmployee)
router.post("/fetchContributors", getEmployee)
router.post("/delete", deleteEmployee)
router.post("/edit", updateEmployee)

export default router;
