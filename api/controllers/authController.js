import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserPassword,

} from "../services/authService.js";
import { getEmployeeByEmail, getEmployeeById } from "../services/employeeService.js"
import argon2 from "argon2";

// Cadastrar usuário
export const signup = async (req, res) => {
  try {
    const { cnpj, email, password, security_phrase } = req.body;
    // Validação básica
    if (!cnpj || !email || !password || !security_phrase) {
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
    const hashedSecurityPhrase = await argon2.hash(security_phrase);

    const userData = { cnpj, email, password: hashedPassword, security_phrase: hashedSecurityPhrase };
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

    let user = await getUserByEmail(email);
    if (!user) {
      user = await getEmployeeByEmail(email);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "Usuário não encontrado"
        });
      }
    }
    // Verifica senha (com criptografia)
    if (!await argon2.verify(user.password, password)) {
      return res.status(401).json({
        success: false,
        error: "Senha incorreta"
      });
    }

    // Salvar na sessão
    if (user.id) {
      // employee
      req.session.userId = user.uuid;
      req.session.employeeId = user.id;
      req.session.user = {
        id: user.uuid,
        employeeId: user.id,
        email: user.email,
        cnpj: user.cnpj
      };
    } else {
      // usuário normal
      req.session.userId = user.uuid;
      req.session.user = {
        id: user.uuid,
        email: user.email,
        cnpj: user.cnpj
      };
    }


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
        employee: user.id ? true : false,
        debug: {
          sessionId: req.sessionID,
          userId: req.session.userId,
          employeeId: req.session.employeeId || null
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
      const userId = req.session.userId || req.session.user.id || req.session.user.uuid || req.session.user._id;

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

      let employee = null;
      if (req.session.employeeId) {
        employee = await getEmployeeById(req.session.employeeId);
      }

      return res.status(200).json({
        success: true,
        user,
        employee
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

      res.clearCookie('sessionId');
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

//Verificação de frase
export const forgotPassword = async (req, res) => {
  try {
    const { email, security_phrase } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Usuário não encontrado"
      });
    }
    if (!await argon2.verify(user.security_phrase, security_phrase)) {
      return res.status(401).json({
        success: false,
        error: "Frase de segurança incorreta"
      });
    }

    res.status(200).json({
      success: true,
      message: "Frase de segurança verificada com sucesso"
    });
  } catch (error) {
    console.error("Erro na verificação da frase de segurança:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor"
    });
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { new_password, confirm_password, email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        error: "E-mail é obrigatório"
      });
    }
    if (new_password !== confirm_password) {
      return res.status(400).json({
        success: false,
        error: "As senhas não coincidem"
      });
    }
    const hashedPassword = await argon2.hash(new_password);
    const userData = await updateUserPassword(email, hashedPassword);
    if (!userData) {
      return res.status(404).json({
        success: false,
        error: "Usuário não encontrado"
      });
    }
    res.status(200).json({
      success: true,
      message: "Senha redefinida com sucesso"
    });

  } catch (error) {
    console.error("Erro ao resetar a senha:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor"
    });
  }
}

//Google Login
export const sucessGoogleLogin = (req, res) => {
  if (!req.user) {
    res.redirect("/failure");
  }
  res.status(200).json({
    message: "Usuário autenticado com sucesso",
    user: req.user,
  });
};
export const failureGoogleLogin = (req, res) => {
  console.error("Falha na autenticação do Google:", req.query);
  res.status(401).json({ error: "Falha na autenticação do Google" });
};


