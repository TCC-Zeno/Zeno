// Imports
import express from 'express';
import routes from './routes.js';
import cors from 'cors';


const app = express();
const PORT =  3000;


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', routes);
 
app.get('/', (req, res) => {    
    res.send("Está funcionando!");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

