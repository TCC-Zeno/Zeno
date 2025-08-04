import express from "express";
import { signup, signin, logout, sucessGoogleLogin, failureGoogleLogin } from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

//Rotas de usuario 
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google",{successRedirect:"/success", failureRedirect:"/failure"}));


router.get("/sucess" , sucessGoogleLogin);
router.get("/failure", failureGoogleLogin);
export default router;
