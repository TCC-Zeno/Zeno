import express from "express";

import { addUser, fetchUserByEmail } from "../controllers/userController.js";

const router = express.Router();

//Rotas
router.post("/signup", addUser);
router.post("/signin", fetchUserByEmail);

export default router;
