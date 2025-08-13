import express from "express";
import {updateUserCredential,uploadProfileImage } from "../controllers/userController.js";




const router = express.Router();
router.post("/update", updateUserCredential);
router.post("/logo", uploadProfileImage)


export default router;
