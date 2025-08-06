// Testes
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import "./strategies/local.js";


// Rotas
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import financeRoutes from"./routes/finance.js";


dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie:{secure : false},
    maxAge: 1000 * 60 * 60 * 24, // 1 dia
  })
);


app.use(passport.initialize());
app.use(passport.session());

//Rotas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/finance", financeRoutes);

//Inicializando servidor
  app.listen(3000, () => {
    console.log("Servidor em execução na porta 3000");
  });
