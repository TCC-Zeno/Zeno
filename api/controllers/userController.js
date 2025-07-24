import { 
  getUserById,
  updateUser
} from "../services/userService.js"

export const updateUserCredential = async (req, res) => {
  const { id, companyName, ownerName, color } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ error: "ID não informado." });
    }
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado para o ID informado." });
    }
    const updatedUser = await updateUser(id, {companyName: companyName, ownerName: ownerName, color:color} );
    if (!updatedUser || updatedUser.length === 0) {
      return res.status(400).json({ error: "Falha ao atualizar usuário. Verifique os dados enviados." });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: `Erro interno ao atualizar usuário: ${error.message}` });
  }
};