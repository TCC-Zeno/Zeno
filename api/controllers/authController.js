import {
  createUser,
  getUserByEmail,
  getUserById,
  /*getUsers, 
  updateUser,
  deleteUser,
  searchUsers*/
} from "../services/authService.js";
import argon2 from "argon2";

// Cadastrar usuário
export const signup = async (req, res) => {
  try {
    const { cnpj, email, password, } = req.body;
    // Validação básica
    if (!cnpj || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Todos os campos são obrigatórios."
      });
    }
    // Verifica se o usuário já existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "E-mail já cadastrado."
      });
    }
    // Cria usuário
    const hashedPassword = await argon2.hash(password);

    const userData = { cnpj, email, password: hashedPassword };
    const newUser = await createUser(userData);
    res.status(201).json({
      success: true,
      user: newUser
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Login de usuário 
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Usuário não encontrado"
      });
    }
    // Verifica senha (com criptografia)
    if (!await argon2.verify(user.password, password)) {
      return res.status(401).json({
        success: false,
        error: "Senha incorreta"
      });
    }

    // Salvar na sessão
    req.session.userId = user.uuid;
    req.session.user = {
      id: user.uuid,
      email: user.email,
      cnpj: user.cnpj
    };

    // Force salvar a sessão
    req.session.save((err) => {
      if (err) {
        console.error('Erro ao salvar sessão:', err);
        return res.status(500).json({
          success: false,
          error: "Erro ao salvar sessão"
        });
      }

      // Remove senha da resposta pq é feio 
      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({
        success: true,
        user: userWithoutPassword,
        debug: {
          sessionId: req.sessionID,
          userId: req.session.userId
        }
      });
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor"
    });
  }
};

// Verificar sessão ativa 
export const checkSession = (req, res) => {
  try {
    if (req.session && req.session.userId && req.session.user) {
      res.status(200).json({
        success: true,
        user: req.session.user,
        debug: {
          sessionId: req.sessionID,
          userId: req.session.userId
        }
      });
    } else {
      res.status(401).json({
        success: false,
        error: "Sessão não encontrada",
      });
    }
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor"
    });
  }
};

// Obtem os dados da sessão do usuário para salvar no Redux
export const getSession = async (req, res) => {
  try {
    if (req.session && req.session.user) {
      const userId = req.session.user.id || req.session.user.uuid || req.session.user._id;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: "ID do usuário não encontrado na sessão"
        });
      }

      const user = await getUserById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "Usuário não encontrado"
        });
      }

      return res.status(200).json({
        success: true,
        user
      });
    }

    return res.status(401).json({
      success: false,
      error: "Sessão não encontrada"
    });

  } catch (error) {
    console.error("Erro ao obter sessão:", error);
    return res.status(500).json({
      success: false,
      error: "Erro ao obter sessão"
    });
  }
};



export const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Erro ao destruir sessão:", err);
        return res.status(500).json({
          success: false,
          error: "Erro ao fazer logout"
        });
      }

      res.clearCookie('connect.sid');
      res.status(200).json({
        success: true,
        message: "Logout realizado com sucesso"
      });
    });
  } catch (error) {
    console.error("Erro no logout:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor"
    });
  }
};

//Google Login
export const sucessGoogleLogin = (req, res) => {
  if (!req.user) {
    res.redirect("/failure");
  }
  console.log("Usuário autenticado com sucesso:", req.user);
  res.status(200).json({
    message: "Usuário autenticado com sucesso",
    user: req.user,
  });
};
export const failureGoogleLogin = (req, res) => {
  console.error("Falha na autenticação do Google:", req.query);
  res.status(401).json({ error: "Falha na autenticação do Google" });
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