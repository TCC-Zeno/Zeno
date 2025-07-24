// Testes
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";


// Rotas
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";


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
  })
);



//Rotas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

//Inicializando servidor
  app.listen(3000, () => {
    console.log("Servidor em execução na porta 3000");
  });
