//Testes 
import { 
  createUser,
  getUserByEmail,
  /*getUsers, 
  getUserById, 
  updateUser,
  deleteUser,
  searchUsers*/
} from "../services/authService.js";

//Cadastrar usuário
export const signup = async (req, res) => {
  try {
    const { cnpj, email, password } = req.body;
    // Validação básica
    if (!cnpj || !email || !password) {
      return res.status(401).json({ error: "Todos os campos são obrigatórios." });
    }
    // Verifica se o usuário já existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "E-mail já cadastrado." });
    }
    // Cria usuário
    const userData = { cnpj, email, password };
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    // Log detalhado para debug
    console.error("Erro ao criar usuário:", error);
    res.status(400).json({ error: error.message });
  }
};

//Login de usuário
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    // Verifica senha (simples, sem criptografia)
    if (user.password !== password) {
      return res.status(401).json({ error: "Senha incorreta" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
export const fetchUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const modifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await updateUser(id, updates);
    if (!updatedUser || updatedUser.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const users = await searchUsers(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
*/