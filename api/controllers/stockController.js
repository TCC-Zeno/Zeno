import{
    addProduct,
    addSupplier,
    getProduct,
    deleteProduct,
    updateProduct,
    uploadImage,
    getSupplier,
    deleteSupplier,
    updateSupplier,
} from "../services/stockService.js";


export const createProduct = async (req, res) => {
  try {
    const { name, description, product_category, minimum_quantity, image, fixed_quantity, userId, quantity_of_product, alert } = req.body;
    const data = await addProduct(name, description, product_category, minimum_quantity, image, fixed_quantity, userId, quantity_of_product, alert);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSupplier = async (req, res) => {
  try {
    const { name, email, telephone, location } = req.body;
    const data = await addSupplier(name, email, telephone, location);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const upload = multer({ storage: multer.memoryStorage() });
export const uploadProductImage = [
  upload.single("image"),
  async (req, res) => {
    const { uuid } = req.body;
    const file = req.file;
    try {
      if (!uuid) {
        return res.status(400).json({ error: "ID não informado." });
      }
      const user = await getProduct(uuid);
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


export const readProduct = async (req, res) => {
  try {
    const data = await getProduct();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const stockData = req.body;
    const data = await updateProduct(id, stockData);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteProduct(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const readSupplier = async (req, res) => {
  try {
    const data = await getSupplier();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const stockData = req.body;
    const data = await updateSupplier(id, stockData);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteSupplier(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};