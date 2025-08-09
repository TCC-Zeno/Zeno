import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import createMemoryStore from 'memorystore';
import passport from "passport";
// import "./strategies/local.js"; Tirei isso pq acho que não precisa mais

const MemoryStore = createMemoryStore(session);

// Rotas
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import financeRoutes from "./routes/finance.js";

dotenv.config();
const app = express();
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    secret: "zeno-secret-key",
    name: 'sessionId', 
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, 
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      sameSite: 'lax'
    },
    store: new MemoryStore({
      checkPeriod: 86400000 // 24h
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Rotas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/finance", financeRoutes);

// Inicializando servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;