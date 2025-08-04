import express from "express";
import { signup, signin, logout } from "../controllers/authController.js";

const router = express.Router();

//Rotas de usuario 
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);

export default router;
