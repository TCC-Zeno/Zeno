import {
  create,
  getEmployeeCnpj,
  getEmployeeByEmail,
  destroy,
  update,
} from "../services/employeeService.js";
import { getUserByEmail } from "../services/authService.js";
import argon2 from "argon2";

export const createEmployee = async (req, res) => {
  try {
    const {
      owner_uuid,
      cnpj,
      email,
      password,
      company_name,
      name,
      color,
      features,
      logo,
    } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "E-mail já cadastrado.",
      });
    }

    // Verifica se o funcionário já existe
    const existingEmployee = await getEmployeeByEmail(email);
    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        error: "Funcionário já cadastrado.",
      });
    }

    // Cria usuário
    const hashedPassword = await argon2.hash(password);

    const employeeData = {
      uuid: owner_uuid,
      cnpj: cnpj,
      company_name: company_name,
      name: name,
      color: color,
      email: email,
      password: hashedPassword,
      features: features,
      logo: logo,
    };
    const newUser = await create(employeeData);
    res.status(201).json({
      success: true,
      user: newUser,
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message || err.details || JSON.stringify(err),
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { cnpj } = req.body;

    const data = await getEmployeeCnpj(cnpj);
    if (!data || data.length === 0) {
      return res.status(404).json("Funcionário não encontrado");
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "ID do funcionário é obrigatório" });
    }

    const resultado = await destroy(id);
    if (resultado.error) {
      return res.status(400).json({ error: resultado.error });
    }

    res.status(200).json({ message: "Funcionário deletado com sucesso" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id, name, email, password, features } = req.body;
    if (!id) {
      return res.status(400).json({ error: "ID do funcionário é obrigatório" });
    }

    const hashedPassword = await argon2.hash(password);

    const updateData = {
      id: id,
      name: name,
      email: email,
      password: hashedPassword,
      features: features,
    };
    const resultado = await update(updateData);

    if (resultado.error) {
      return res.status(400).json({ error: resultado.error });
    }
    res.status(200).json({ message: "Funcionário atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ "Erro inteno ao atualizar": err.message });
  }
};
