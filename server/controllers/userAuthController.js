/* eslint-disable no-undef */
import express from 'express';

const supabase = require('../config/supabase');
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
// import fs from 'fs';



const  login = express();

login.use(bodyParser.urlencoded({extended : true}));
login.use(cookieParser());
login.use(express.static('src'));

    
login.get ( '/' , (req,res)=>{
    res.sendFile(path.join(___dirname, 'src', 'components', 'SignUp', 'SignUp.jsx'))
});

login.post('/signup', async (req,res)=>{
    const {cnpj, email, password} = req.body;
    const {user, error} = await supabase.auth.signUp({cnpj, email, password});
    if(error){
        res.send("Erro ao cadastrar!")
    }
    res.status(200).send ("usuario criado com sucesso")
});
login.get('/signIn', async (req,res)=>{
    const {email, password} = req.body;
    const{error,data} = await supabase.auth.signIn({email, password})

    if(error){
        res.send("Erro ao cadastrar!")
    }
    res.status(200).redirect ('/home')//nao sei se esse home vai dar certo 

})