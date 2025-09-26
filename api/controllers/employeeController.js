import { create } from "../services/employeeService.js"
import {getUserByEmail} from "../services/authService.js"
import argon2 from "argon2";

export const createEmployee = async (req, res) => {
    try {
        const { cnpj, email, password, company_name, name, color, user_type, features } = req.body
        console.log("req.body:", req.body);
        if (!cnpj || !email || !password) {
            return res.status(400).json({
                success: false,
                error: "Todos os campos são obrigatórios."
            });
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: "E-mail já cadastrado."
            });
        }
            // Cria usuário
            const hashedPassword = await argon2.hash(password);

            const data = { cnpj: cnpj, email: email, password: hashedPassword, user_type: user_type, company_name: company_name, name: name, color: color, features: features };
            const newUser = await create(data);
            console.log("Novo usuário criado:", newUser);
            res.status(201).json({ 
              success: true, 
              user: newUser 
            });
            
          } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(400).json({ 
              success: false, 
              error: error 
            });
    }
}