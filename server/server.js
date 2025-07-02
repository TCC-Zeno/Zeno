// Testes
import express from 'express';
import userRoutes from "./routes/userRoutes"
import cors from 'cors';
import dotenv from 'dotenv '

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use("/api, userRoutes")
app.get("/", (req,res) =>{
    res.send("API está rodando");
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log("Server Rodando");
})