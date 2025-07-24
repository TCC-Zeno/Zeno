import express from "express";
import { signup, signin } from "../controllers/authController.js";

const router = express.Router();

//Rotas de usuario 
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
