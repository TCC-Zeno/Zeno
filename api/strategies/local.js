
import passport from "passport";
import {  getUserByEmail, getUserById } from "../services/authService.js";
import { Strategy as LocalStrategy} from "passport-local";


//Sessao do usuario
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user.uuid);
});


passport.deserializeUser(async (uuid, done) => {
  console.log("Deserializing user with ID:", uuid);
  try {
    const user = await getUserById(uuid);
    if (!user)  throw new Error("User not found");
    console.log(user)
      done(null, user);
    
  } catch (error) {
    console.error("", error);
    return done(error);
  }
  
});

passport.use(new LocalStrategy({
  usernameField: "email",
    passwordField: "password",},
  async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: "Usuário não encontrado" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Senha incorreta" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));
