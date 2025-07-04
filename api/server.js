// Testes
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import flash from "connect-flash";

// Rotas
import authRoutes from "./routes/auth.js";


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


//conectando flash
app.use(flash());

//Mensagens do flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");

  res.locals.error_msg = req.flash("error_msg");

  res.locals.error = req.flash("error");

  res.locals.user = req.user || null;

  next();
});

//Rotas
app.use("/", authRoutes);


//Inicializando servidor
  app.listen(3000, () => {
    console.log("Servidor em execução na porta 3000");
  });
