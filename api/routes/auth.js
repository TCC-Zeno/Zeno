import express from "express";
import { addUser, fetchUserByEmail } from "../controllers/userController.js";

const router = express.Router();

//Rotas de usuario 
router.post("/signup", addUser);
router.post("/signin", fetchUserByEmail);

export default router;
