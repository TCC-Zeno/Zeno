import express from "express";
import {updateUserCredential, } from "../controllers/userController.js";


const router = express.Router();
router.post("/update", updateUserCredential);



export default router;
