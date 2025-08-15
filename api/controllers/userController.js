import { 
  getUserById,
  updateUser,
  uploadImage
} from "../services/userService.js"
import multer from "multer";

export const updateUserCredential = async (req, res) => {
  const { uuid, companyName, ownerName, color,accessibility} = req.body;
  try {
    if (!uuid) {
      return res.status(400).json({ error: "ID não informado." });
    }
    const user = await getUserById(uuid);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado para o ID informado." });
    }
   
    const updatedUser = await updateUser(uuid, {companyName: companyName, ownerName: ownerName, color:color, accessibility:accessibility} );
    if (!updatedUser || updatedUser.length === 0) {
      return res.status(400).json({ error: "Falha ao atualizar usuário. Verifique os dados enviados." });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: `Erro interno ao atualizar usuário: ${error.message}` });
  }
};

const upload = multer({ storage: multer.memoryStorage() });
export const uploadProfileImage = [
  upload.single("logo"),
  async (req, res) => {
    const { uuid } = req.body;
    const file = req.file;
    try {
      if (!uuid) {
        return res.status(400).json({ error: "ID não informado." });
      }
      const user = await getUserById(uuid);
      if (!user) {
        return res
          .status(404)
          .json({ error: "Usuário não encontrado para o ID informado." });
      }
      if (!file) {
        return res
          .status(400)
          .json({
            error:
              'Arquivo não encontrado no request. Use o campo "logo" no formData.',
          });
      }
      const uploadedImage = await uploadImage(file, uuid);
      if (!uploadedImage) {
        return res.status(400).json({
          error: "Falha ao enviar imagem. Verifique os dados enviados.",
        });
      }
      return res.status(200).json(uploadedImage);
    } catch (error) {
      res.status(500).json({ error: `Erro interno ao enviar imagem: ${error.message}` });
    }
  },
];