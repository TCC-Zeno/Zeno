import { create } from "../services/employeeService.js"
import { getUserByEmail } from "../services/authService.js"
import argon2 from "argon2";

export const createEmployee = async (req, res) => {
  try {
    const { cnpj, email, password, company_name, name, color, features } = req.body
    console.log("req.body:", req.body);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
    return res.status(409).json({
      success: false,
    error: "E-mail já cadastrado."
    });
    }

    // Cria usuário
    const hashedPassword = await argon2.hash(password);

    const employeeData = {
      cnpj: cnpj,
      company_name: company_name,
      name: name,
      color: color,
      email: email,
      password: hashedPassword,
      user_type: "employee",
      features: features
    };
    const newUser = await create(employeeData);
    res.status(201).json({
      success: true,
      user: newUser
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      error: err
    });
  }
}